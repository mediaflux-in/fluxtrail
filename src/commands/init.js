import { success, info, warn } from '../lib/utils.js';
import { 
  ensureCapsuleDir, 
  isInitialized, 
  writeInitialState, 
  writeInitialMemory, 
  writeInitialHandoff 
} from '../lib/storage.js';

export async function init() {
  if (await isInitialized()) {
    warn('Project already initialized with .capsule directory.');
    return;
  }

  try {
    info('Initializing new capsule context...');
    
    await ensureCapsuleDir();
    await writeInitialState();
    await writeInitialMemory();
    await writeInitialHandoff();

    success('Successfully initialized .capsule directory and initial files.');
  } catch (err) {
    throw new Error(`Failed to initialize capsule context: ${err.message}`);
  }
}
