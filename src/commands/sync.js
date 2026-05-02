import { success, error, info, warn } from '../lib/utils.js';
import { updateGraph } from '../lib/graph.js';
import { gitShield } from '../lib/storage.js';
import { capture } from './capture.js';
import { continueProject } from './continue.js';
import { execa } from 'execa';

/**
 * Unified sync command: Rebuild graph AND captures progress AND updates instructions.
 */
export async function sync(summary, options) {
  try {
    // 1. Python Safety Check before running graph engine
    let pythonFound = false;
    try {
      await execa('python', ['--version']);
      pythonFound = true;
    } catch (e) {
      try {
        await execa('python3', ['--version']);
        pythonFound = true;
      } catch (e2) {
        warn('Python was not found. Install Python or use the safe manual workflow:');
        console.log('  graphify .');
        console.log('  capsule-context graph import');
      }
    }

    // 2. Run Graphify (Local AST) if Python exists
    if (pythonFound) {
      await updateGraph();
    }

    // 3. Run Capture (Task Context)
    const syncSummary = summary || 'Automated Power Sync';
    await capture(syncSummary, options.cli || 'capsule-sync');

    // 4. Update Instructions (Gemini by default)
    await continueProject('gemini');

    // 5. Final hardening: protected staged files
    await gitShield();

    success('Capsule Nexus sync completed: Architecture, Task Context, and AI Instructions are now in tact.');
  } catch (err) {
    error(`Sync failed: ${err.message}`);
  }
}

