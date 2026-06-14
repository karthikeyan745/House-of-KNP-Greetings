import { defineConfig } from 'vite';

export default defineConfig({
  // The 'public' directory for static assets that should be served
  // at the root path without processing or fingerprinting.
  // In Vite, `public/` folder files are copied as-is to `dist/`.
  // Since our images are referenced as `images/english.jpg` (not `/images/...`),
  // we keep them in the root `images/` folder and they get copied to `dist/images/`.
  
  build: {
    // Output to the 'dist' folder (default, required for Vercel)
    outDir: 'dist',
    
    // Ensure assets are properly resolved
    assetsDir: 'assets',
    
    // Copy the images directory to dist as-is
    rollupOptions: {
      output: {
        // Preserve original filenames for images (no fingerprint hash)
        assetFileNames: (assetInfo) => {
          if (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(assetInfo.name)) {
            return 'images/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
});
