<script lang="ts">
    import {clientVariable} from "$lib/global/variables/ClientVariable";
    import {enhance} from '$app/forms';
    import {snackBar} from "$stores/layouts/snackBar";
    import {showMessage} from "$lib/global/helpers/FormHelper";
    import Input from "$components/Input/index.svelte";
    import Button from "$components/Button/index.svelte";
    import {AutoCompleteType} from "$lib/global/enums/AutoCompleteType";
    import {StyleType} from "$lib/global/enums/StyleType";
</script>

<div class="container">
	<div class="header">
		<h1>{clientVariable.siteName}</h1>
	</div>
	<form action="?/forgotPassword"
	      method="POST"
	      use:enhance={() => {
              return ({ result, update }) => {
                  showMessage(result.data, snackBar);

                  update({ reset: false });
              };
          }}
	>
		<Input autoComplete={AutoCompleteType.EMAIL}
		       name="email"
		       placeholder="Email"/>

		<Button styleType={StyleType.PRIMARY_CTA}
		        title="Reset Password"
		        type="submit"/>
	</form>
</div>

<style lang="scss">
  @import "$scss/variables";
  @import "$scss/mixin";

  .container {
    margin: 5rem auto auto;
    max-width: 30rem;
  }

  .header {
    text-align: center;
  }

  h1 {
    font-size: 40px;
  }

  form {
    text-align: center;
  }

  .form {
    margin-top: 4rem;
  }

  button {
    @include primary-cta-button;
  }
</style>
