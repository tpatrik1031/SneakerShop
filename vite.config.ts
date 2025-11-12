import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import i18n from 'laravel-react-i18n/vite';
import { run } from "vite-plugin-run";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), 'VITE_');

    return {
        server: {
            port: parseInt(env.VITE_PORT) || 5173,
            host: env.VITE_HOST || '0.0.0.0',
            hmr: {
                clientPort: parseInt(env.VITE_HMR_CLIENT_PORT) || 5173,
                host: env.VITE_HMR_HOST || '127.0.0.1'
            }
        },
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.tsx',
                refresh: true
            }),
            react(),
            tailwindcss(),
            i18n(),
            run([
                {
                    name: 'wayfinder',
                    run: ['php', 'artisan', 'wayfinder:generate'],
                    pattern: ['routes/**/*.php', 'app/**/Http/**/*.php']
                }
            ])
        ],
        esbuild: {
            jsx: 'automatic'
        },
        resolve: {
            alias: {
                'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
                '@actions/': './resources/js/actions',
                '@routes/': './resources/js/routes'
            }
        }
    };
});
