import fs from 'fs-extra';
import path from 'path';
import { execa } from 'execa';

const CAPSULE_DIR = '.capsule';
const GRAPH_DIR = path.join(CAPSULE_DIR, 'graph');
const GRAPHIFY_OUT = 'graphify-out';

export async function ensureCapsuleDir() {
  const dirPath = path.join(process.cwd(), CAPSULE_DIR);
  await fs.ensureDir(dirPath);
  await fs.ensureDir(path.join(dirPath, 'history'));
}

export async function isInitialized() {
  const dirPath = path.join(process.cwd(), CAPSULE_DIR);
  return await fs.pathExists(dirPath);
}

/**
 * Checks for the presence of graphify-out files.
 */
export async function getGraphifyFileStatus() {
  return {
    report: await fs.pathExists(path.join(process.cwd(), GRAPHIFY_OUT, 'GRAPH_REPORT.md')),
    json: await fs.pathExists(path.join(process.cwd(), GRAPHIFY_OUT, 'graph.json')),
    html: await fs.pathExists(path.join(process.cwd(), GRAPHIFY_OUT, 'graph.html'))
  };
}

/**
 * Reads the raw GRAPH_REPORT.md from graphify-out.
 */
export async function getRawGraphifyReport() {
  const filePath = path.join(process.cwd(), GRAPHIFY_OUT, 'GRAPH_REPORT.md');
  if (await fs.pathExists(filePath)) {
    return await fs.readFile(filePath, 'utf8');
  }
  return null;
}

/**
 * Manages the compact graph-summary.md inside .capsule.
 */
export async function writeGraphSummary(content) {
  const filePath = path.join(process.cwd(), CAPSULE_DIR, 'graph-summary.md');
  await fs.writeFile(filePath, content);
}

export async function getGraphSummary() {
  const filePath = path.join(process.cwd(), CAPSULE_DIR, 'graph-summary.md');
  if (await fs.pathExists(filePath)) {
    return await fs.readFile(filePath, 'utf8');
  }
  return null;
}

export async function writeInitialState(projectName = path.basename(process.cwd())) {
  const filePath = path.join(process.cwd(), CAPSULE_DIR, 'state.json');
  const initialState = {
    projectName,
    lastCLI: 'fluxtrail-cli',
    lastHandoff: null,
    initializedAt: new Date().toISOString()
  };
  await fs.writeJson(filePath, initialState, { spaces: 2 });
  
  // Also initialize recent-files.json
  await writeRecentFiles([]);
}

export async function writeRecentFiles(files) {
  const filePath = path.join(process.cwd(), CAPSULE_DIR, 'recent-files.json');
  await fs.writeJson(filePath, files, { spaces: 2 });
}

export async function getRecentFiles() {
  const filePath = path.join(process.cwd(), CAPSULE_DIR, 'recent-files.json');
  if (await fs.pathExists(filePath)) {
    return await fs.readJson(filePath);
  }
  return [];
}

export async function writeInitialMemory() {
  const filePath = path.join(process.cwd(), CAPSULE_DIR, 'memory.md');
  const initialMemory = `# Project Memory

## Architecture
(Describe project architecture here)

## Key Facts
(List key facts, decisions, and constraints here)

## Progress
(Track high-level progress here)
`;
  await fs.writeFile(filePath, initialMemory);
}

export async function getMemory() {
  const filePath = path.join(process.cwd(), CAPSULE_DIR, 'memory.md');
  if (await fs.pathExists(filePath)) {
    return await fs.readFile(filePath, 'utf8');
  }
  return '';
}

export async function writeInitialHandoff() {
  const filePath = path.join(process.cwd(), CAPSULE_DIR, 'handoff.md');
  const initialHandoff = `# Latest Handoff

(This is an empty handoff template)
`;
  await fs.writeFile(filePath, initialHandoff);
}

export async function getLatestHandoff() {
  const filePath = path.join(process.cwd(), CAPSULE_DIR, 'handoff.md');
  if (await fs.pathExists(filePath)) {
    return await fs.readFile(filePath, 'utf8');
  }
  return '';
}

export async function updateState(updates) {
  const filePath = path.join(process.cwd(), CAPSULE_DIR, 'state.json');
  const currentState = await fs.readJson(filePath);
  const newState = { ...currentState, ...updates };
  await fs.writeJson(filePath, newState, { spaces: 2 });
}

export async function getState() {
  const filePath = path.join(process.cwd(), CAPSULE_DIR, 'state.json');
  return await fs.readJson(filePath);
}

export async function getGitStatus() {
  try {
    const { stdout } = await execa('git', ['status', '--short']);
    if (!stdout) return [];
    return stdout.split('\n').filter(Boolean);
  } catch (err) {
    return []; // Git not initialized or other error
  }
}

export async function archiveHandoff() {
  const handoffPath = path.join(process.cwd(), CAPSULE_DIR, 'handoff.md');
  const historyDir = path.join(process.cwd(), CAPSULE_DIR, 'history');
  
  if (await fs.pathExists(handoffPath)) {
    await fs.ensureDir(historyDir);
    const now = new Date();
    const timestamp = now.toISOString().split('T')[0].replace(/-/g, '') + '_' + 
                      now.toISOString().split('T')[1].split('.')[0].replace(/:/g, '');
    const archivePath = path.join(historyDir, `handoff_${timestamp}.md`);
    await fs.copy(handoffPath, archivePath); // Use copy instead of move to keep current handoff.md readable
  }
}

export async function writeHandoff(content) {
  const filePath = path.join(process.cwd(), CAPSULE_DIR, 'handoff.md');
  await fs.writeFile(filePath, content);
}

/**
 * Git-Shield: Automatically stages context files to protect them
 * from cache-clearing scripts and reboots.
 */
export async function gitShield() {
  try {
    // Only stage small metadata files to avoid bloat
    const filesToShield = [
      path.join(CAPSULE_DIR, 'state.json'),
      path.join(CAPSULE_DIR, 'memory.md'),
      path.join(CAPSULE_DIR, 'handoff.md'),
      path.join(CAPSULE_DIR, 'graph', 'graph.json')
    ];
    
    for (const file of filesToShield) {
      if (await fs.pathExists(path.join(process.cwd(), file))) {
        await execa('git', ['add', file]);
      }
    }
    
    info('Git-Shield: Context staged and protected from cache clearing.');
  } catch (err) {
    // Silent fail if not a git repo
  }
}
