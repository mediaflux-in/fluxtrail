import chalk from 'chalk';
import { generateOnboardingPrompt } from '../lib/onboarder.js';
import { isInitialized } from '../lib/storage.js';
import { error, info } from '../lib/utils.js';

export async function onboard() {
  if (!(await isInitialized())) {
    error('Project context not initialized. Run "fluxtrail init" first.');
    return;
  }

  const prompt = await generateOnboardingPrompt();

  console.log('\n' + chalk.cyan('==================== ONBOARDING PROMPT ===================='));
  console.log(prompt);
  console.log(chalk.cyan('===========================================================\n'));
  
  info('Copy the prompt above to onboard a new agent with full context.');
}
