<script lang="ts">
    import {sideMenu} from "$stores/layouts/sideMenu";
    import {camelCaseToNormal} from "$lib/global/utilities/StringParser";
    import Logout from "$layouts/Logout/index.svelte";

    import {page} from '$app/stores';
    import type {PageLink} from "$lib/global/types/PageLink";

    let pageList: PageLink[];
    $: {
        const pageScopes: string[] = Array.from(new Set(
            $page.data.jwt.scopes?.split(",").filter((item: string) => item.includes("page"))
        ));

        pageList = pageScopes.map((item: string) => {
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
    flex: 1;
    flex-direction: column;
  }

  .bottom__container {
    height: 3rem;
    margin: auto;
  }

  ul {
    flex: 1;
    list-style: none;
    margin: 0;
    padding-left: 1rem;
  }

  li {
    padding: 0.2rem 0;
  }

  a {
    @include primary-hover-effect;

    color: $primary-black;
    font-weight: bolder;
    text-decoration: none;
  }
</style>
