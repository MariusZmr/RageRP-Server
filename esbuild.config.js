const esbuild = require('esbuild');
const { esbuildDecorators } = require('esbuild-plugin-typescript-decorators');
const { globSync } = require('glob');
const path = require('path');
const fs = require('fs');

async function buildServer() {
    const distPath = path.join(__dirname, 'packages/server/dist');
    if (fs.existsSync(distPath)) fs.rmSync(distPath, { recursive: true, force: true });

    const entryPoints = globSync('src/server/**/*.ts');
    console.log(`🚀 [BUILD-SERVER] Compilare ${entryPoints.length} fișiere...`);

    await esbuild.build({
        entryPoints,
        bundle: false,
        outdir: 'packages/server/dist',
        platform: 'node',
        format: 'cjs',
        target: 'node14',
        sourcemap: true,
        plugins: [esbuildDecorators()],
        outbase: 'src/server'
    });
}

async function buildClient() {
    const clientEntry = path.join(__dirname, 'src/client/index.ts');
    if (!fs.existsSync(clientEntry)) {
        // Creăm un fișier de index gol dacă nu există
        fs.writeFileSync(clientEntry, "mp.gui.chat.push('Client-side loaded!');\n");
    }

    console.log(`🚀 [BUILD-CLIENT] Bundling client-side...`);

    await esbuild.build({
        entryPoints: [clientEntry],
        bundle: true, // IMPORTANT: Unim totul pentru client
        outfile: 'client_packages/index.js',
        platform: 'browser', // Clientul RAGE e un engine JS custom similar browserului
        format: 'iife', // Format executabil imediat
        target: 'esnext',
        sourcemap: false, // Nu vrem sourcemaps pe client în producție (opțional)
        minify: true, // Micșorăm fișierul pentru download mai rapid
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
