<script lang="ts">
    import {clientVariable} from "$lib/global/variables/ClientVariable";
    import {enhance} from '$app/forms';
    import {page} from "$app/stores";
    import Input from "$components/Input/index.svelte";
    import Button from "$components/Button/index.svelte";
    import {AutoCompleteType} from "$lib/global/enums/AutoCompleteType";
    import {showMessage} from "$lib/global/helpers/FormHelper";
    import {snackBar} from "$stores/layouts/snackBar";
    import {StyleType} from "$lib/global/enums/StyleType";
    import type {ActionResult} from "@sveltejs/kit";
    import type {ResponseDto} from "$lib/global/dtos/ResponseDto";
    import {ButtonType} from "$lib/global/enums/ButtonType";

    const handleResult = async (result: ActionResult) => {
        if (result.type !== "success") return;
        const data = (result.data as ResponseDto);

        showMessage(data, snackBar);
    }
</script>

<div class="container">
    <div class="header">
        <h1>{clientVariable.siteName}</h1>
    </div>
    <form
        action="?/resetPassword"
        method="POST"
        use:enhance={({formData}) => {
              formData.set("token", $page.params.token);

              return ({ result, update }) => {
                  handleResult(result);

                  update({ reset: false });
              };
        }}
    >
        <Input
            autoComplete={AutoCompleteType.NEW_PASSWORD}
            name="password"
            placeholder="Password"
            type="password"
        />

        <Input
            autoComplete={AutoCompleteType.NEW_PASSWORD}
            name="passwordConfirmation"
            placeholder="Password Confirmation"
            type="password"
        />

        <Button
            styleType={StyleType.PRIMARY_CTA}
            title="Create Password"
            type={ButtonType.SUBMIT}
        />
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
</style>
