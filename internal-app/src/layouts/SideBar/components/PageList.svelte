<script lang="ts">
    import {sideMenu} from "$stores/layouts/sideMenu";
    import {camelCaseToNormal} from "$lib/global/utilities/StringParser";
    import Logout from "$layouts/Logout/index.svelte";

    import {page} from '$app/stores';

    let pageList;
    $: {
        const pageScopes = [...new Set(
            $page.data.jwt.scopes?.split(",")
                .filter(item => item.includes("page")))];

        pageList = pageScopes.map(item => {
            const page = item.split(".")[0];

            return {
                link: page,
                title: camelCaseToNormal(page),
            };
        });

        pageList = [...pageList.sort((a, b) => {
            return a.title.toLowerCase() < b.title.toLowerCase() ? -1 :
                a.title.toLowerCase() > b.title.toLowerCase() ? 1 : 0;
        })];
    }
</script>

<div class="container">
	<ul>
		{#each pageList as page}
			<li>
				<a on:click={() => sideMenu.set(!$sideMenu)}
				   href="/{page.link}">{page.title}</a>
			</li>
		{/each}
	</ul>
	<div class="bottom__container">
		<Logout cssClass="position: relative; top: 30%;"/>
	</div>
</div>

<style lang="scss">
  @import "$scss/variables";
  @import "$scss/mixin";

  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .bottom__container {
    height: 3rem;
    margin: auto;
  }

  ul {
    list-style: none;
    flex: 1;
    margin: 0;
    padding-left: 1rem;
  }

  li {
    padding: 0.2rem 0;
  }

  a {
    @include primary-hover-effect;
    text-decoration: none;
    color: $primary-black;
    font-weight: bolder;
  }
</style>
