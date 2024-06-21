import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		define: {
		  'process.env.API_URL': JSON.stringify(env.VITE_API_URL)
		},
		plugins: [react(), UnoCSS()],
	}
})
