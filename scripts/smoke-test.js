import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';

const TEST_DIR = path.join(process.cwd(), 'test-sandbox');
const INDEX_PATH = path.join(process.cwd(), 'src/index.js');

async function runTest() {
  console.log('🚀 Starting FluxTrail Smoke Tests...\n');

  try {
    // Clean sandbox
    if (await fs.pathExists(TEST_DIR)) {
      await fs.remove(TEST_DIR);
    }
    await fs.ensureDir(TEST_DIR);

    // 1. CLI Help Test
    console.log('Test 1: CLI Help output and branding');
    const { stdout: helpOut } = await execa('node', [INDEX_PATH, '--help']);
    if (helpOut.includes('FluxTrail') && !helpOut.includes('capsule-context')) {
      console.log('✅ Help verified branding and command name.\n');
    } else {
      throw new Error('Branding incorrect or legacy names found in help output');
    }

    // 2. Doctor Test
    console.log('Test 2: fluxtrail doctor');
    const { stdout: doctorOut } = await execa('node', [INDEX_PATH, 'doctor'], { cwd: TEST_DIR });
    if (doctorOut.includes('FluxTrail Doctor')) {
      console.log('✅ Doctor command functional.\n');
    } else {
      throw new Error('Doctor output incorrect');
    }

    // 3. Setup Full Dry Run
    console.log('Test 3: fluxtrail setup full --dry-run');
    const { stdout: setupOut } = await execa('node', [INDEX_PATH, 'setup', 'full', '--dry-run'], { cwd: TEST_DIR });
    if (setupOut.includes('[DRY RUN]')) {
      console.log('✅ Setup dry-run functional.\n');
    } else {
      throw new Error('Setup dry-run failed');
    }

    // 4. Init Test
    console.log('Test 4: Initialize project context');
    await execa('node', [INDEX_PATH, 'init'], { cwd: TEST_DIR });
    if (await fs.pathExists(path.join(TEST_DIR, '.capsule'))) {
      console.log('✅ .capsule directory created.\n');
    } else {
      throw new Error('.capsule directory was not created');
    }

    // 5. Capture Test
    console.log('Test 5: Capture handoff');
    await execa('node', [INDEX_PATH, 'capture', 'Smoke test handoff'], { cwd: TEST_DIR });
    const handoff = await fs.readFile(path.join(TEST_DIR, '.capsule/handoff.md'), 'utf8');
    if (handoff.includes('Smoke test handoff')) {
      console.log('✅ Handoff successfully stored.\n');
    } else {
      throw new Error('Handoff content mismatch');
    }

    // 6. Graph Status Test (Safe manual workflow)
    console.log('Test 6: Graph status (no files case)');
    const { stdout: statusOut } = await execa('node', [INDEX_PATH, 'graph', 'status'], { cwd: TEST_DIR });
    if (statusOut.includes('No Graphify output found')) {
      console.log('✅ Safe status check confirmed.\n');
    }

    // 7. Onboard Test
    console.log('Test 7: Onboarding prompt generation');
    const { stdout: onboardOut } = await execa('node', [INDEX_PATH, 'onboard'], { cwd: TEST_DIR });
    if (onboardOut.includes('<!-- CAPSULE-CLI:START -->')) {
      console.log('✅ Onboarding marker found.\n');
    } else {
      throw new Error('Onboarding prompt missing required markers');
    }

    // Clean up
    await fs.remove(TEST_DIR);
    console.log('✨ All tests passed! FluxTrail is release-ready.');
    process.exit(0);
  } catch (err) {
    console.error(`❌ Test failed: ${err.message}`);
    if (await fs.pathExists(TEST_DIR)) await fs.remove(TEST_DIR);
    process.exit(1);
  }
}

runTest();
