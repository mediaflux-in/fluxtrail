import fs from 'fs-extra';
import path from 'path';
import { isInitialized, getMemory, getLatestHandoff, getRecentFiles } from '../lib/storage.js';
import { success, error, info } from '../lib/utils.js';
import { generateOnboardingPrompt } from '../lib/onboarder.js';

const TARGET_MAP = {
  gemini: 'GEMINI.md',
  codex: 'AGENTS.md',
  claude: 'CLAUDE.md'
};

const MARKER_START = '<!-- CAPSULE-CLI:START -->';
const MARKER_END = '<!-- CAPSULE-CLI:END -->';

export async function continueProject(target) {
  if (!(await isInitialized())) {
    error('Project not initialized. Run "capsule-context init" first.');
    return;
  }

  const fileName = TARGET_MAP[target.toLowerCase()];
  if (!fileName) {
    error(`Unsupported target: ${target}. Supported: gemini, codex, claude`);
    return;
  }

  try {
    const filePath = path.join(process.cwd(), fileName);
    const contextBlock = await generateOnboardingPrompt();
    
    let fileContent = '';
    if (await fs.pathExists(filePath)) {
      fileContent = await fs.readFile(filePath, 'utf8');
    }

    const startIndex = fileContent.indexOf(MARKER_START);
    const endIndex = fileContent.indexOf(MARKER_END);

    let newContent = '';
    if (startIndex !== -1 && endIndex !== -1) {
      // Replace existing block
      newContent = fileContent.substring(0, startIndex) + 
                   contextBlock + 
                   fileContent.substring(endIndex + MARKER_END.length);
      info(`Updating existing context block in ${fileName}...`);
    } else {
      // Append to bottom
      newContent = fileContent ? (fileContent.trim() + '\n\n' + contextBlock) : contextBlock;
      info(`Adding new context block to ${fileName}...`);
    }

    await fs.writeFile(filePath, newContent);
    success(`Successfully updated ${fileName} with latest capsule context.`);
  } catch (err) {
    error(`Failed to update ${fileName}: ${err.message}`);
  }
}
