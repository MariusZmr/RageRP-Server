const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');
const { esbuildDecorators } = require('esbuild-plugin-typescript-decorators');

async function buildServer() {
    const distPath = path.join(__dirname, 'packages/server/dist');
    if (fs.existsSync(distPath)) fs.rmSync(distPath, { recursive: true, force: true });

    console.log(`🚀 [BUILD-SERVER] Bundling server-side with decorators...`);

    try {
        await esbuild.build({
            entryPoints: [path.join(__dirname, 'src/server/index.ts')],
            bundle: true,
            outfile: path.join(__dirname, 'packages/server/dist/index.js'),
            platform: 'node',
            target: 'node16',
            format: 'cjs',
            sourcemap: true,
            external: ['mariadb', 'mysql2', 'express', 'dotenv', 'typeorm', 'bcryptjs', 'reflect-metadata'],
            plugins: [
                esbuildDecorators({
                    tsconfig: path.join(__dirname, 'src/server/tsconfig.json'),
                }),
            ],
            tsconfig: path.join(__dirname, 'src/server/tsconfig.json'),
        });
    } catch (err) {
        console.error(err);
        throw new Error('Esbuild server compilation failed');
    }
}

async function buildClient() {
    const clientEntry = path.join(__dirname, 'src/client/index.ts');
    console.log(`🚀 [BUILD-CLIENT] Bundling client-side...`);

    await esbuild.build({
        entryPoints: [clientEntry],
        bundle: true,
        outfile: 'client_packages/index.js',
        platform: 'browser',
        format: 'iife',
        target: 'esnext',
        sourcemap: false,
        minify: true,
        tsconfig: path.join(__dirname, 'src/client/tsconfig.json'),
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
