<script lang="ts">
    import ActionDropdown from "./ActionDropdown.svelte";
    import type {ResponseDto} from "$lib/global/dtos/ResponseDto";
    import {searchTable} from "../helpers/TableHelper";
    import type {
        GridColumnDef
    } from "$components/DataTable/types/GridColumnDef.js";
    import {filterList} from "$components/DataTable/stores/filterList";

    export let search = "";
    export let columns: GridColumnDef[];
    export let sortStatus = "";
    export let open;
    export let selectedRow;
    export let openTableControls = false;
    export let response: ResponseDto;
    export let filterOpen: boolean;

    const toggleRow = () => {
        selectedRow = {};
        open = true;
    }

    const toggleTableControls = () => {
        openTableControls = !openTableControls;
    }

    const searchCall = async () => {
        const result = await searchTable(columns, search, sortStatus,
            response.links.self.href, $filterList);

        if (result) {
            response = result;
        }
    }
</script>

<div class="container">
    <div class="left">
        <div class="query_status">
            {response.data.length}
            of {response.data.length < 200 ? response.data.length : response.meta.count}
            items
        </div>
    </div>

    <div class="right">
        <div style="position: relative;">
            <form on:submit|preventDefault={searchCall}>
                <input
                    bind:value={search}
                    class="search"
                    placeholder="Search"
                    type="text"
                >
            </form>

            <svg
                aria-hidden="true"
                class="search_icon"
                fill="currentColor"
                focusable="false"
                stroke="currentColor"
                stroke-width="0.1"
                viewBox="0 0 24 24"
            >
                <path
                    d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
        </div>

        <div class="config__container" data-ignore="tableConfig">
            <button
                class="config__button"
                data-ignore="tableConfig"
                on:click={toggleTableControls}
            >
                <svg
                    aria-hidden="true"
                    data-ignore="tableConfig"
                    fill="currentColor"
                    focusable="false"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                >
                    <path
                        d="M26.1 19.1c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7z"></path>
                    <path
                        d="M47.1 32.4l-3.7-3.1c.2-1.1.3-2.3.3-3.4s-.1-2.3-.3-3.4l3.7-3.1c1.2-1 1.6-2.8.8-4.2l-1.6-2.8c-.6-1-1.7-1.6-2.9-1.6-.4 0-.8.1-1.1.2l-4.6 1.7c-1.8-1.6-3.8-2.7-5.9-3.4L31 4.6c-.3-1.6-1.7-2.5-3.3-2.5h-3.2c-1.6 0-3 .9-3.3 2.5l-.8 4.6c-2.2.7-4.2 1.9-6 3.4l-4.6-1.7c-.4-.1-.7-.2-1.1-.2-1.2 0-2.3.6-2.9 1.6l-1.6 2.8c-.8 1.4-.5 3.2.8 4.2l3.7 3.1c-.2 1.1-.3 2.3-.3 3.4 0 1.2.1 2.3.3 3.4L5 32.3c-1.2 1-1.6 2.8-.8 4.2l1.6 2.8c.6 1 1.7 1.6 2.9 1.6.4 0 .8-.1 1.1-.2l4.6-1.7c1.8 1.6 3.8 2.7 5.9 3.4l.8 4.8c.3 1.6 1.6 2.7 3.3 2.7h3.2c1.6 0 3-1.2 3.3-2.8l.8-4.8c2.3-.8 4.4-2 6.2-3.7l4.3 1.7c.4.1.8.2 1.2.2 1.2 0 2.3-.6 2.9-1.6l1.5-2.6c.9-1.1.5-2.9-.7-3.9zm-21 4.7c-6.1 0-11-4.9-11-11s4.9-11 11-11 11 4.9 11 11-4.9 11-11 11z"></path>
                </svg>
                <svg
                    aria-hidden="true"
                    class="down_arrow"
                    data-ignore="tableConfig"
                    fill="currentColor"
                    focusable="false"
                    stroke="currentColor"
                    stroke-width="0.1"
                    viewBox="0 0 24 24"
                >
                    <path d="m7 10 5 5 5-5z"></path>
                </svg>
            </button>
            {#if openTableControls}
                <ActionDropdown
                    bind:filterOpen={filterOpen}
                    bind:openTableControls={openTableControls}
                />
            {/if}
        </div>

        <button class="toggle__button" on:click={toggleRow} title="Add Row">
            <svg
                aria-hidden="true"
                fill="currentColor"
                focusable="false"
                stroke="currentColor"
                stroke-width="0.1"
                viewBox="0 0 24 24"
            >
                <path
                    d="M14 10H3v2h11v-2zm0-4H3v2h11V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM3 16h7v-2H3v2z"></path>
            </svg>
        </button>
    </div>
</div>

<style lang="scss">
    @import "$scss/_mixin.scss";

    .container {
        border-bottom: $primary-border;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        padding: 0.4rem;
        width: 100%;
    }

    .right {
        display: flex;
        justify-content: right;
        position: relative;
    }

    .left {
        margin-top: auto;
    }

    .query_status {
        font-size: 12px;
    }

    .search {
        @include primary-input;
        border: none;
        height: 100%;
        margin: auto 0.3rem auto 0;
        max-width: 15rem;
        padding: 0.4rem 0.4rem 0.4rem 2rem;

        &::placeholder {
            opacity: 0.4;
        }
    }

    .search_icon {
        color: $medium-grey;
        height: 1.4rem;
        left: 0.2rem;
        position: absolute;
        opacity: 0.4;
        top: 0.3rem;
        width: 1.4rem;
    }

    .config__container {
        position: relative;
    }

    .config__button, .toggle__button {
        background-color: $primary-white;
        border: none;
        border-radius: $primary-border-radius;
        cursor: pointer;
        display: flex;
        height: 2rem;
        justify-content: center;
        padding: 0;
        position: relative;
        width: 2.1rem;

        svg {
            height: 14px;
            left: 0.05rem;
            position: relative;
            top: 30%;
            width: 14px;
        }

        &:hover {
            color: $dark-grey;
        }

        .down_arrow {
            width: 10px;
        }
    }

    .toggle__button {
        margin-left: 0.3rem;

        svg {
            height: 1.5rem;
            left: 0.07rem;
            top: 0.3rem;
            width: 1.5rem;
        }
    }
</style>