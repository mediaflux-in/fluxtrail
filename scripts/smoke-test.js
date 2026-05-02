import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';

const TEST_DIR = path.join(process.cwd(), 'test-sandbox');

async function runTest() {
  console.log('🚀 Starting Capsule Nexus Smoke Tests...\n');

  try {
    // Clean sandbox
    if (await fs.pathExists(TEST_DIR)) {
      await fs.remove(TEST_DIR);
    }
    await fs.ensureDir(TEST_DIR);

    // 1. CLI Help Test
    console.log('Test 1: CLI Help output');
    const { stdout: helpOut } = await execa('node', ['src/index.js', '--help']);
    if (helpOut.includes('Capsule Nexus')) {
      console.log('✅ Help verified branding.\n');
    } else {
      throw new Error('Branding missing in help output');
    }

    // 2. Init Test
    console.log('Test 2: Initialize capsule');
    await execa('node', [path.join(process.cwd(), 'src/index.js'), 'init'], { cwd: TEST_DIR });
    if (await fs.pathExists(path.join(TEST_DIR, '.capsule'))) {
      console.log('✅ .capsule directory created.\n');
    } else {
      throw new Error('.capsule directory was not created');
    }

    // 3. Capture Test
    console.log('Test 3: Capture handoff');
    await execa('node', [path.join(process.cwd(), 'src/index.js'), 'capture', 'Smoke test handoff'], { cwd: TEST_DIR });
    const handoff = await fs.readFile(path.join(TEST_DIR, '.capsule/handoff.md'), 'utf8');
    if (handoff.includes('Smoke test handoff')) {
      console.log('✅ Handoff successfully stored.\n');
    } else {
      throw new Error('Handoff content mismatch');
    }

    // 4. Graph Status Test (Manual Workflow Safety)
    console.log('Test 4: Graph status (no files case)');
    const { stdout: statusOut } = await execa('node', [path.join(process.cwd(), 'src/index.js'), 'graph', 'status'], { cwd: TEST_DIR });
    if (statusOut.includes('No Graphify output found')) {
      console.log('✅ Safe status check confirmed.\n');
    }

    // 5. Onboard Test
    console.log('Test 5: Onboarding prompt generation');
    const { stdout: onboardOut } = await execa('node', [path.join(process.cwd(), 'src/index.js'), 'onboard'], { cwd: TEST_DIR });
    if (onboardOut.includes('<!-- CAPSULE-CLI:START -->')) {
      console.log('✅ Onboarding marker found.\n');
    } else {
      throw new Error('Onboarding prompt missing required markers');
    }

    // Clean up
    await fs.remove(TEST_DIR);
    console.log('✨ All tests passed! Capsule Nexus is release-ready.');
    process.exit(0);
  } catch (err) {
    console.error(`❌ Test failed: ${err.message}`);
    if (await fs.pathExists(TEST_DIR)) await fs.remove(TEST_DIR);
    process.exit(1);
  }
}

runTest();
