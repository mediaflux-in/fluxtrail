import { execa } from 'execa';
import chalk from 'chalk';
import { info, success, warn, error } from '../lib/utils.js';

/**
 * Robustly checks if a command exists in the system PATH.
 */
async function commandExists(cmd) {
  try {
    if (process.platform === 'win32') {
      const { stdout } = await execa('where', [cmd], { reject: false });
      return stdout.trim().length > 0;
    } else {
      const { stdout } = await execa('which', [cmd], { reject: false });
      return stdout.trim().length > 0;
    }
  } catch (e) {
    return false;
  }
}

export async function doctor() {
  info('FluxTrail Doctor - Checking system environment...\n');

  const required = {
    node: false,
    npm: false,
    git: false
  };

  const recommended = {
    python: false,
    pip: false,
    graphify: false,
    gemini: false,
    codex: false,
    claude: false
  };

  // Required Checks
  try {
    const { stdout } = await execa('node', ['-v']);
    const major = parseInt(stdout.replace('v', '').split('.')[0]);
    if (major >= 18) {
      console.log(`${chalk.green('✔')} Node.js ${stdout.trim()} (>=18 required)`);
      required.node = true;
    } else {
      console.log(`${chalk.red('✘')} Node.js ${stdout.trim()} (>=18 required)`);
    }
  } catch (e) {
    console.log(`${chalk.red('✘')} Node.js not found`);
  }

  try {
    const { stdout } = await execa('npm', ['-v']);
    console.log(`${chalk.green('✔')} npm ${stdout.trim()}`);
    required.npm = true;
  } catch (e) {
    console.log(`${chalk.red('✘')} npm not found`);
  }

  try {
    if (await commandExists('git')) {
      const { stdout } = await execa('git', ['--version']);
      console.log(`${chalk.green('✔')} ${stdout.trim()}`);
      required.git = true;
    } else {
      console.log(`${chalk.red('✘')} Git not found`);
    }
  } catch (e) {
    console.log(`${chalk.red('✘')} Git not found`);
  }

  console.log('');

  // Recommended Checks
  try {
    if (await commandExists('python')) {
      console.log(`${chalk.green('✔')} Python found`);
      recommended.python = true;
    } else if (await commandExists('python3')) {
      console.log(`${chalk.green('✔')} Python 3 found`);
      recommended.python = true;
    } else {
      console.log(`${chalk.yellow('⚠')} Python not found (recommended for Graphify)`);
    }
  } catch (e) {
    console.log(`${chalk.yellow('⚠')} Python not found (recommended for Graphify)`);
  }

  try {
    if (await commandExists('pip')) {
      console.log(`${chalk.green('✔')} pip found`);
      recommended.pip = true;
    } else {
      console.log(`${chalk.yellow('⚠')} pip not found`);
    }
  } catch (e) {
    console.log(`${chalk.yellow('⚠')} pip not found`);
  }

  try {
    if (await commandExists('graphify')) {
      console.log(`${chalk.green('✔')} Graphify CLI found`);
      recommended.graphify = true;
    } else {
      console.log(`${chalk.yellow('⚠')} Graphify CLI not found (recommended for project maps)`);
    }
  } catch (e) {
    console.log(`${chalk.yellow('⚠')} Graphify CLI not found (recommended for project maps)`);
  }

  // AI CLIs
  const aiTools = [
    { name: 'Gemini CLI', cmd: 'gemini', key: 'gemini' },
    { name: 'Codex CLI', cmd: 'codex', key: 'codex' },
    { name: 'Claude Code', cmd: 'claude', key: 'claude' }
  ];

  for (const tool of aiTools) {
    try {
      if (await commandExists(tool.cmd)) {
        console.log(`${chalk.green('✔')} ${tool.name} found`);
        recommended[tool.key] = true;
      } else {
        console.log(`${chalk.blue('ℹ')} ${tool.name} not detected (optional)`);
      }
    } catch (e) {
      console.log(`${chalk.blue('ℹ')} ${tool.name} not detected (optional)`);
    }
  }

  console.log('\n--- Status Summary ---');
  
  if (required.node && required.npm && required.git) {
    success('Basic FluxTrail mode: Ready');
  } else {
    error('Basic FluxTrail mode: Not Ready (Install missing required tools)');
  }

  if (recommended.python && recommended.graphify) {
    success('Full Graphify-powered mode: Ready');
  } else {
    warn('Full Graphify-powered mode: Limited (Install Python and Graphify for maps)');
  }

  if (!recommended.graphify && recommended.python) {
    info('\nTo fix: python -m pip install graphifyy && graphify install');
  }
}
