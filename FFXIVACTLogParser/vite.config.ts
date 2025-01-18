import { fileURLToPath, URL } from 'node:url';
import { UserConfig, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueReactivityTransform from '@vue-macros/reactivity-transform/vite';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

// Get base folder for certificates.
const baseFolder =
  process.env.APPDATA !== undefined && process.env.APPDATA !== ''
    ? `${process.env.APPDATA}/ASP.NET/https`
    : `${process.env.HOME}/.aspnet/https`;

// Generate the certificate name using the NPM package name
const certificateName = process.env.npm_package_name;

// Define certificate filepath
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
// Define key filepath
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

export default defineConfig(async () => {
  // Ensure the certificate and key exist
  if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    // Wait for the certificate to be generated
    await new Promise<void>((resolve) => {
      spawn('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
      ], { stdio: 'inherit', })
        .on('exit', (code) => {
          resolve();
          if (code) {
            process.exit(code);
          }
        });
    });
  };

  // Define Vite configuration
  const config: UserConfig = {
    root: 'ClientApp',
    publicDir: false,
    build: {
      manifest: true,
      emptyOutDir: true,
      outDir: '../wwwroot',
      assetsDir: '',
      rollupOptions: {
        input: './ClientApp/src/main.ts',
      }
    },
    server: {
      strictPort: true,
      https: {
        cert: certFilePath,
        key: keyFilePath
      }
    },
    plugins: [
      vue({
        template: {
          transformAssetUrls: {
            video: ['src', 'poster'],
            source: ['src'],
            img: ['src'],
            image: ['xlink:href', 'href'],
            use: ['xlink:href', 'href']
          }
        }
      }),
      vueReactivityTransform()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./ClientApp/src', import.meta.url)),
        '@assets': fileURLToPath(new URL('./ClientApp/src/assets', import.meta.url)),
        '@models': fileURLToPath(new URL('./ClientApp/src/models', import.meta.url)),
      },
    },
    assetsInclude: ['**/*.csv']
  };

  return config;
});
