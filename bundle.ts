import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

function runCommand(command: string): string {
  console.log(`Running command: ${command}`);
  const output = execSync(command, { encoding: 'utf-8' });
  console.log(output);
  return output;
}

function getRustcHost(): string {
  try {
    // Execute the rustc -Vv command and capture the output
    const output = execSync('rustc -Vv', { encoding: 'utf-8' });

    // Split the output into lines
    const lines = output.split('\n');

    // Find the line containing "host:"
    const hostLine = lines.find(line => line.includes('host:'));

    // Extract the host value
    if (hostLine) {
      const hostValue = hostLine.split(' ')[1].trim();
      return hostValue;
    } else {
      throw new Error('Host information not found');
    }
  } catch (error) {
    console.error('Error retrieving rustc host information:', error);
    process.exit(1);
  }
}

async function copyFiles() {
  try {
    const sourceData = path.join('node_modules', '@electric-sql', 'pglite', 'dist', 'postgres.data');
    const sourceWasm = path.join('node_modules', '@electric-sql', 'pglite', 'dist', 'postgres.wasm');
    const migrationsDir = path.join('migrations');
    const pkgJsonDir = path.join('pkg.json');
    const destDir = path.join('bundle');

    // Ensure the destination directory exists
    await fs.ensureDir(destDir);

    // Copy the files
    await fs.copy(sourceData, path.join(destDir, 'postgres.data'));
    await fs.copy(sourceWasm, path.join(destDir, 'postgres.wasm'));
    await fs.copy(migrationsDir, path.join(destDir, 'migrations'));
    await fs.copy(pkgJsonDir, path.join(destDir, 'pkg.json'));

    console.log('Files copied successfully');
  } catch (err) {
    console.error('Error copying files:', err);
  }
}

async function main() {
  try {
    // Step 1: Run esbuild
    runCommand('pnpm tsup');

    // Step 2: Copy postgres.data and postgres.wasm files
    await copyFiles();
    console.log(`Postgres wasm copied !!`);

    // Step 3: Get rustc host
    const rustcHost = getRustcHost();
    console.log(`Rustc host: ${rustcHost}`);

    // Step 4: Run pkg with the extracted host
    const pkgCommand = `pkg bundle/index.cjs --config ./pkg.json -o ./src-tauri/bin/server-${rustcHost}  --debug  --public --no-bytecode`;
    runCommand(pkgCommand);
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

main();