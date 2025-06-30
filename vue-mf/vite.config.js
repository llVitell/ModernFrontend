// vite.config.ts - Vue MF
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
export default defineConfig({
    plugins: [
        vue(),
        federation({
            name: 'vue-mf',
            filename: 'remoteEntry.js',
            exposes: {
                './Logo': './src/components/LogoWrapper.tsx',
            },
            shared: ['vue', 'react', 'react-dom']
        })
    ],
    define: {
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)
    },
    build: {
        modulePreload: false,
        target: "esnext",
        minify: false,
        cssCodeSplit: false,
    },
});
