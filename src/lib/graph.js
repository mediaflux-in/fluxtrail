import { execa } from 'execa';
import path from 'path';
import fs from 'fs-extra';
import { info, warn } from './utils.js';

const GRAPH_DIR = path.join('.capsule', 'graph');

/**
 * Dynamically finds the correct command to run graphify.
 * Checks for 'graphify' in PATH, then 'python -m graphify'.
 */
async function getGraphifyCommand() {
  try {
    // 1. Try direct command
    await execa('graphify', ['--help']);
    return { cmd: 'graphify', args: [] };
  } catch (e) {
    try {
      // 2. Try python module
      await execa('python', ['-m', 'graphify', '--help']);
      return { cmd: 'python', args: ['-m', 'graphify'] };
    } catch (e2) {
      try {
        // 3. Try python3 module
        await execa('python3', ['-m', 'graphify', '--help']);
        return { cmd: 'python3', args: ['-m', 'graphify'] };
      } catch (e3) {
        throw new Error('graphify not found. Please install it with: pip install graphifyy');
      }
    }
  }
}

/**
 * Runs graphify update in AST-only mode to rebuild the knowledge graph
 * without using any LLM tokens.
 */
export async function updateGraph() {
  const outDir = path.join(process.cwd(), GRAPH_DIR);
  await fs.ensureDir(outDir);
  
  info('Updating architectural knowledge graph (AST-only, 0 tokens)...');
  
  try {
    const { cmd, args } = await getGraphifyCommand();
    
    // We run graphify update . and then manually move the artifacts to .capsule/graph
    // because graphify default output is graphify-out/
    const { stdout, stderr } = await execa(cmd, [...args, 'update', '.']);
    
    // Graphify update . always writes to ./graphify-out
    const defaultOut = path.join(process.cwd(), 'graphify-out');
    if (await fs.pathExists(defaultOut)) {
      await fs.copy(defaultOut, outDir, { overwrite: true });
      // Keep .graphify_root in sync
      await fs.writeFile(path.join(outDir, '.graphify_root'), process.cwd());
    }

    return true;
  } catch (err) {
    warn(`Graph update skipped or failed: ${err.message}`);
    return false;
  }
}

/**
 * Self-healing: checks if graph exists, rebuilds if not.
 */
export async function ensureGraphExists() {
  const graphPath = path.join(process.cwd(), GRAPH_DIR, 'graph.json');
  if (!(await fs.pathExists(graphPath))) {
    info('Graph not found. Rebuilding from source code...');
    await updateGraph();
  }
}
