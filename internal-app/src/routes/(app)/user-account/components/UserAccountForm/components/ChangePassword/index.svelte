<script lang="ts">
    import Input from "$components/Input/index.svelte";
    import {AutoCompleteType} from "$lib/global/enums/AutoCompleteType";
    import {InputType} from "$lib/global/enums/InputType";
</script>

<h3>Change Password</h3>

<Input autoComplete={AutoCompleteType.CURRENT_PASSWORD}
       name="confirmCurrentPassword"
       placeholder="Confirm Current Password"
       type={InputType.PASSWORD}/>

<Input autoComplete={AutoCompleteType.NEW_PASSWORD}
       name="newPassword"
       placeholder="New Password"
       type={InputType.PASSWORD}/>

<Input autoComplete={AutoCompleteType.NEW_PASSWORD}
       name="confirmNewPassword"
       placeholder="Confirm New Password"
       type={InputType.PASSWORD}/>