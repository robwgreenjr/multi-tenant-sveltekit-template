<script lang="ts">
    import {enhance} from '$app/forms';
    import UserDetails from "./components/UserDetails/index.svelte";
    import ChangePassword from "./components/ChangePassword/index.svelte";
    import Button from "$components/Button/index.svelte";
    import {ButtonType} from "$lib/global/enums/ButtonType";
    import {page} from "$app/stores";
    import {showMessage} from "$lib/global/helpers/FormHelper";
    import {snackBar} from "$stores/layouts/snackBar";
    import {MessageSeverity} from "$lib/global/enums/MessageSeverity";
    import {StyleType} from "$lib/global/enums/StyleType";
</script>

<form action="?/submitUserAccountForm"
      class="container"
      method="POST"
      use:enhance={({formData}) => {
            formData.set("id", $page.data.user.id);

            return ({ result, update }) => {
                showMessage(result.data, snackBar, {
                    message: "User updated!",
                    severity: MessageSeverity.SUCCESS,
                    show: true,
                    timeout: 2000,
                });

                update({ reset: false });
            };
      }}>
	<div>
		<UserDetails/>
	</div>

	<div>
		<ChangePassword/>
	</div>

	<div class="save_container">
		<Button styleType={StyleType.PRIMARY_CTA}
		        title="Save"
		        type={ButtonType.SUBMIT}/>
	</div>
</form>

<style lang="scss">
  @import "$scss/_variables.scss";

  .container {
    height: 100%;
    display: grid;
    grid-template-columns: 100%;

    @media (min-width: $medium-width-query) {
      grid-template-columns: 45% 45%;
      grid-column-gap: 10%;
    }
  }

  .save_container {
    @media (min-width: $medium-width-query) {
      margin: auto 0 0.5rem 0;
      grid-column-end: -1;
    }
  }
</style>