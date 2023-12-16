<script lang="ts">
	import Button from "$components/Button/index.svelte";
	import RoleTable from "./components/RoleTable/index.svelte";
	import RoleForm from "./components/RoleForm/index.svelte";
	import {currentRole} from "./stores/currentRole";
	import {roleList} from "./stores/roleList";
	import {page} from "$app/stores";

	roleList.set($page.data.roleList);
</script>

<div class="container">
    <div class="header">
        <h3>Roles</h3>
        <div class="right_side">
            <Button onClick={() => currentRole.set({
				id: "",
				name: "",
				description: "",
				permissions: [],
				users: []
			})}
                    title="Add New Role"/>
        </div>
    </div>

    <RoleTable/>

    <RoleForm/>
</div>

<style lang="scss">
  .container {
    height: 100%;
  }

  .header {
    display: flex;
    justify-content: space-between;

    .right_side {
      margin: auto 0;
    }
  }
</style>
