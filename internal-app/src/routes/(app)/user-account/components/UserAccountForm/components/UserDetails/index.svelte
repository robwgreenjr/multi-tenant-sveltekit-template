<script lang="ts">
    import Input from "$components/Input/index.svelte";
    import {InputType} from "$lib/global/enums/InputType";
    import {AutoCompleteType} from "$lib/global/enums/AutoCompleteType";

    import {page} from '$app/stores';
</script>

<h3>Edit Account</h3>

<Input
    autoComplete={AutoCompleteType.FIRST_NAME}
    name="firstName"
    placeholder="First Name"
    value={$page.data.user.firstName}
/>

<Input
    autoComplete={AutoCompleteType.LAST_NAME}
    name="lastName"
    placeholder="Last Name"
    value={$page.data.user.lastName}
/>

<Input
    autoComplete={AutoCompleteType.EMAIL}
    name="email"
    placeholder="Email"
    value={$page.data.user.email}
/>

<Input
    autoComplete={AutoCompleteType.TEL}
    name="phone"
    placeholder="Phone"
    type={InputType.TEL}
    value={$page.data.user.phone}
/>