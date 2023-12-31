import adapter from '@sveltejs/adapter-auto';
import {vitePreprocess} from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
        // If your environment is not supported or you settled on a specific environment, switch out the adapter.
        // See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: adapter(),
        alias: {
            "$components": "./src/components",
            "$components/*": "./src/components/*",
            "$layouts": "./src/layouts",
            "$layouts/*": "./src/layouts/*",
            "$directives": "./src/directives",
            "$directives/*": "./src/directives/*",
            "$stores": "./src/stores",
            "$stores/*": "./src/stores/*",
            "$scss": "./src/scss",
            "$scss/*": "./src/scss/*",
            "$types": "./.svelte-kit/types/src/routes",
            "$types/*": "./.svelte-kit/types/src/routes/*"
        },
        csrf: false
    }
};

export default config;
