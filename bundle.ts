import { execSync } from 'child_process';

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

function main(): void {
  try {
    // Step 1: Run esbuild
    runCommand('node esbuild.config.mjs');

    // Step 2: Get rustc host
    const rustcHost = getRustcHost();
    console.log(`Rustc host: ${rustcHost}`);

    // Step 3: Run pkg with the extracted host
    const pkgCommand = `pkg bundle/server.bundle.js --config pkg.json -o ./src-tauri/bin/server-${rustcHost} --debug`;
    runCommand(pkgCommand);
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

main();