import { isInitialized, archiveHandoff, writeHandoff, updateState, getGitStatus, gitShield } from '../lib/storage.js';
import { success, error, info } from '../lib/utils.js';

export async function capture(summary, cliName = 'capsule-context-cli') {
  if (!(await isInitialized())) {
    error('Project not initialized. Run "capsule init" first.');
    return;
  }

  if (!summary) {
    error('Summary is required for capture.');
    return;
  }

  try {
    await archiveHandoff();
    
    // Improve capture: include Git changed files
    const gitStatus = await getGitStatus();
    let finalSummary = summary;
    
    if (gitStatus.length > 0) {
      finalSummary += '\n\n## Git Changed Files\n' + gitStatus.map(s => `- ${s}`).join('\n');
      info(`Detected ${gitStatus.length} changed files from Git.`);
    }

    await writeHandoff(finalSummary);
    await updateState({
      lastCLI: cliName,
      lastHandoff: summary, // Keep original summary in state for cleaner display
      lastCaptureTimestamp: new Date().toISOString()
    });

    // Final hardening step
    await gitShield();

    success('Capture completed successfully.');
  } catch (err) {
    error(`Capture failed: ${err.message}`);
  }
}
