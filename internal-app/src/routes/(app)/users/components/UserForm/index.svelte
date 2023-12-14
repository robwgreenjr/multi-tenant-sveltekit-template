<script lang="ts">
    import Drawer from "$components/Drawer/index.svelte";
    import {currentUser} from "../../stores/currentUser";
    import {showMessage} from "$lib/global/helpers/FormHelper";
    import {snackBar} from "$stores/layouts/snackBar";
    import {MessageSeverity} from "$lib/global/enums/MessageSeverity";
    import {StyleType} from "$lib/global/enums/StyleType";
    import {enhance} from '$app/forms';
    import Input from "$components/Input/index.svelte";
    import Button from "$components/Button/index.svelte";
</script>

<Drawer onClose={() => currentUser.set(null)}
        open={$currentUser}>
	{#if $currentUser}
		<form action="?/{$currentUser.id ? 'updateUser' : 'createUser'}"
		      method="POST"
		      use:enhance={({formData}) => {
                  if ($currentUser.id) {
                    formData.set("id", $currentUser.id);
                  }

                  formData.set("roles", JSON.stringify($currentUser.roles));

	              return ({ result, update }) => {
	                  showMessage(result.data, snackBar, {
	                      message: `User ${$currentUser.id ? 'updated' : 'created'}!`,
	                      severity: MessageSeverity.SUCCESS,
	                      show: true,
	                      timeout: 2000,
	                  });

	                  update({ reset: false });

                      if (result.data.data.length) {
                          currentUser.set(result.data.data[0]);
                      }
	              };
              }}>
			<Input label="First Name"
			       name="firstName"
			       value={$currentUser.firstName ?? null}/>

			<Input label="Last Name"
			       name="lastName"
			       value={$currentUser.lastName ?? null}/>

			<Input label="Email"
			       name="email"
			       value={$currentUser.email ?? null}/>

			<Input label="Phone"
			       name="phone"
			       value={$currentUser.phone ?? null}/>

			<div class="button_container">
				<Button
					styleType={StyleType.PRIMARY_CTA}
					title="Save"
					type="submit"
				/>

				{#if $currentUser.id}
					<Button
						styleType={StyleType.PRIMARY_ERROR}
						title="Delete"
						className="global__user_error_button"
					/>
				{/if}
			</div>

		</form>
	{/if}
</Drawer>

<style lang="scss">
  .button_container {
    display: flex;
    justify-content: space-between;
  }

  :global(.global__user_error_button) {
    width: 6rem;
  }
</style>