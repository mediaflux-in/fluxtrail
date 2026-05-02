import { getMemory, getLatestHandoff, getRecentFiles, getGraphSummary } from './storage.js';

export async function generateOnboardingPrompt() {
  const memory = await getMemory();
  const handoff = await getLatestHandoff();
  const recentFiles = await getRecentFiles();
  const graphSummary = await getGraphSummary();

  const recentlyModifiedList = recentFiles.length > 0 
    ? recentFiles.map(f => `- ${f.path} (${new Date(f.timestamp).toLocaleString()})`).join('\n')
    : 'None recorded';

  const graphSection = graphSummary 
    ? `## Graphify Project Map\n${graphSummary}`
    : '## Graphify Project Map\nGraphify project map not imported yet.';

  return `<!-- CAPSULE-CLI:START -->
# Capsule CLI Current Context

## How To Use
Continue from this context. Do not repeat completed work unless relevant files changed.

## Project Memory
${memory || '(No memory available)'}

${graphSection}

## Latest Handoff
${handoff || '(No handoff available)'}

## Recently Modified Files
${recentlyModifiedList}

## Start Prompt
Continue from the context above. Focus on the next logical coding step. Avoid repeating completed checks unless related files changed.
<!-- CAPSULE-CLI:END -->
`;
}

