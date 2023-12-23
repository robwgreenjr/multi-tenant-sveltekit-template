<script lang="ts">
    import type {PageData} from "$types/(app)/$types";

    export let data: PageData;
</script>

<div>
    Welcome {data.user.firstName}
</div>
