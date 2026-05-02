import { execa } from 'execa';
import { info, success, warn, error } from '../lib/utils.js';

/**
 * setup full command logic.
 */
export async function setupFull(options = {}) {
  const isDryRun = !!options.dryRun;
  
  info('FluxTrail Full Setup - Preparing environment for project maps...\n');
  
  if (isDryRun) {
    info('[DRY RUN] Would check for Python, pip, and Graphify.');
    info('[DRY RUN] Would prompt user for installation of missing optional dependencies.');
    success('[DRY RUN] Setup checks completed safely.');
    return;
  }

  // Real logic
  info('Checking for Python and Graphify (Required for Full Mode)...');

  let pythonCmd = null;
  try {
    await execa('python', ['--version']);
    pythonCmd = 'python';
  } catch (e) {
    try {
      await execa('python3', ['--version']);
      pythonCmd = 'python3';
    } catch (e2) {
      error('Python not found. Please install Python first to use Full Mode.');
      return;
    }
  }

  try {
    await execa('graphify', ['--version']);
    success('Graphify is already installed.');
  } catch (e) {
    warn('Graphify CLI not found.');
    info('To enable Full Project-Map mode, you can install Graphify with:');
    console.log(`  ${pythonCmd} -m pip install graphifyy`);
    console.log('  graphify install');
    console.log('\nFluxTrail does not install these automatically for safety.');
  }

  info('\nChecking for AI Coding Assistants...');
  const tools = ['gemini', 'codex', 'claude'];
  for (const tool of tools) {
    try {
      await execa(tool, ['--version']);
      success(`${tool} detected.`);
    } catch (e) {
      info(`${tool} not found. (Optional, install if you use this assistant)`);
    }
  }

  success('\nSetup check finished. Run "fluxtrail doctor" to verify everything.');
}
