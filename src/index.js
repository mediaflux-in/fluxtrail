#!/usr/bin/env node

import { Command } from 'commander';
import { error } from './lib/utils.js';
import { init } from './commands/init.js';
import { capture } from './commands/capture.js';
import { sync } from './commands/sync.js';
import { watch } from './commands/watch.js';
import { status } from './commands/status.js';
import { onboard } from './commands/onboard.js';
import { continueProject } from './commands/continue.js';
import { doctor } from './commands/doctor.js';
import { setupFull } from './commands/setup.js';

const program = new Command();

program
  .name('fluxtrail')
  .description('FluxTrail - Persistent project context and architectural mapping for AI assistants')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize a new project context in the current directory')
  .action(async () => {
    try {
      await init();
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });

program
  .command('status')
  .description('Check the status of the current project context')
  .action(async () => {
    try {
      await status();
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });

program
  .command('doctor')
  .description('Diagnose and verify the system environment')
  .action(async () => {
    try {
      await doctor();
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });

const setupCommand = program.command('setup');

setupCommand
  .command('full')
  .description('Configure the environment for full project-map mode')
  .option('--dry-run', 'Run checks without making changes')
  .action(async (options) => {
    try {
      await setupFull(options);
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });

const graphCommand = program.command('graph');

graphCommand
  .command('build')
  .description('Run graphify . to build a project map')
  .action(async () => {
    try {
      const { build } = await import('./commands/graph.js');
      await build();
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });

graphCommand
  .command('status')
  .description('Check the status of Graphify output files')
  .action(async () => {
    try {
      const { status } = await import('./commands/graph.js');
      await status();
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });

graphCommand
  .command('import')
  .description('Import and compact Graphify report into the capsule')
  .action(async () => {
    try {
      const { importReport } = await import('./commands/graph.js');
      await importReport();
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });

program
  .command('sync [summary]')
  .description('Unified Power Sync: Rebuild graph AND capture task progress')
  .option('--cli <name>', 'Specify the CLI name doing the sync', 'capsule-sync')
  .action(async (summary, options) => {
    try {
      await sync(summary, options);
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });

program
  .command('capture <summary>')
  .description('Capture the current project state into the capsule')
  .option('--cli <name>', 'Specify the CLI name doing the capture', 'fluxtrail-cli')
  .action(async (summary, options) => {
    try {
      await capture(summary, options.cli);
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });

program
  .command('onboard')
  .description('Onboard a new agent by providing the project context')
  .action(async () => {
    try {
      await onboard();
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });

program
  .command('continue <target>')
  .description('Update AI-specific context files (gemini, codex, claude)')
  .action(async (target) => {
    try {
      await continueProject(target);
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });

program
  .command('watch')
  .description('Watch for changes and automatically update the capsule')
  .action(async () => {
    try {
      await watch();
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
