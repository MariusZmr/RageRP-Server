const esbuild = require('esbuild');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

async function buildServer() {
    const distPath = path.join(__dirname, 'packages/server');
    // Ensure parent directory exists
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath, { recursive: true });
    }

    // We don't want to delete packages/server because it might contain other things,
    // but we should probably clean packages/server/dist if it exists.
    // However, the previous script was rmSync(distPath) where distPath was packages/server/dist.
    // But then it compiled to packages/server/dist.
    // RAGE MP loads packages from packages/<package_name>.
    // Usually code is directly in packages/<package_name> or compiled there.
    // "main": "packages/server/index.js" implies the entry point is at the root of the package.

    // Let's compile to packages/server/
    const outDir = path.join(__dirname, 'packages/server');

    console.log(`🚀 [BUILD-SERVER] Compilare cu SWC...`);
    
    try {
        const swcConfig = path.join(__dirname, '.swcrc');
        const srcDir = path.join(__dirname, 'src/server');
        
        // Ensure outDir exists
        if (!fs.existsSync(outDir)) {
             fs.mkdirSync(outDir, { recursive: true });
        }

        // Run SWC
        // We use --out-dir to specify output directory.
        // We compile from src/server to packages/server
        execSync(`npx swc . -d ${outDir} --config-file ${swcConfig}`, { 
            cwd: srcDir,
            stdio: 'inherit' 
        });

    } catch (err) {
        console.error(err);
        throw new Error('SWC compilation failed');
    }
}

async function buildClient() {
    const clientEntry = path.join(__dirname, 'src/client/index.ts');
    if (!fs.existsSync(clientEntry)) {
        fs.writeFileSync(clientEntry, "mp.gui.chat.push('Client-side loaded!');\n");
    }

    console.log(`🚀 [BUILD-CLIENT] Bundling client-side...`);

    // Ensure client_packages exists
    const clientPackageDir = path.join(__dirname, 'client_packages');
    if (!fs.existsSync(clientPackageDir)) {
        fs.mkdirSync(clientPackageDir, { recursive: true });
    }

    await esbuild.build({
        entryPoints: [clientEntry],
        bundle: true,
        outfile: 'client_packages/index.js',
        platform: 'browser',
        format: 'iife',
        target: 'esnext',
        sourcemap: false,
        minify: true,
    });
}

async function run() {
    try {
        await buildServer();
        await buildClient();
        console.log('✅ [BUILD] Toate sistemele au fost compilate cu succes!');
    } catch (err) {
        console.error('❌ [BUILD] Eroare critică:', err);
        process.exit(1);
    }
}

run();
