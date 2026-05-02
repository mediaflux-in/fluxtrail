import chalk from 'chalk';
import { isInitialized, getState, getRecentFiles } from '../lib/storage.js';
import { error } from '../lib/utils.js';
import path from 'path';
import fs from 'fs-extra';

const CAPSULE_DIR = '.capsule';

export async function status() {
  if (!(await isInitialized())) {
    error('Capsule context not initialized. Run "capsule-context init" first.');
    return;
  }

  const state = await getState();
  const recentFiles = await getRecentFiles();

  console.log('\n' + chalk.bold.blue('--- Capsule Context Status ---'));
  console.log(`${chalk.bold('Project:')} ${state.projectName}`);
  console.log(`${chalk.bold('Last CLI:')} ${state.lastCLI}`);
  console.log(`${chalk.bold('Last Handoff:')} ${state.lastHandoff || 'None'}`);
  console.log(`${chalk.bold('Recently Modified:')} ${recentFiles.length} files`);
  
  if (recentFiles.length > 0) {
    recentFiles.slice(0, 5).forEach(file => {
      console.log(`  - ${file.path}`);
    });
    if (recentFiles.length > 5) {
      console.log(`  ... and ${recentFiles.length - 5} more`);
    }
  }

  const memoryPath = path.join(process.cwd(), CAPSULE_DIR, 'memory.md');
  const memoryExists = await fs.pathExists(memoryPath);
  console.log(`${chalk.bold('Memory:')} ${memoryExists ? chalk.green('Present') : chalk.red('Missing')}`);

  const handoffPath = path.join(process.cwd(), CAPSULE_DIR, 'handoff.md');
  const handoffExists = await fs.pathExists(handoffPath);
  console.log(`${chalk.bold('Handoff:')} ${handoffExists ? chalk.green('Present') : chalk.red('Missing')}`);

  const graphSummaryPath = path.join(process.cwd(), CAPSULE_DIR, 'graph-summary.md');
  const graphSummaryExists = await fs.pathExists(graphSummaryPath);
  console.log(`${chalk.bold('Graph Summary:')} ${graphSummaryExists ? chalk.green('Present') : chalk.red('Missing')}\n`);
}
