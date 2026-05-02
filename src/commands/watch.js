import { isInitialized, getRecentFiles, writeRecentFiles } from '../lib/storage.js';
import { startWatcher } from '../lib/watcher.js';
import { info, error } from '../lib/utils.js';

export async function watch() {
  if (!(await isInitialized())) {
    error('Project not initialized. Run `capsule-context init` first.');
    return;
  }

  info('Watching for file changes (ignoring build artifacts and node_modules)...');
  
  startWatcher(process.cwd(), async (filePath) => {
    try {
      let recentFiles = await getRecentFiles();
      
      // Remove if already exists to move to top
      recentFiles = recentFiles.filter(f => f.path !== filePath);
      
      // Add to top with timestamp
      recentFiles.unshift({
        path: filePath,
        timestamp: new Date().toISOString()
      });
      
      // Keep only last 20 (upped from 10 for better coverage)
      recentFiles = recentFiles.slice(0, 20);
      
      await writeRecentFiles(recentFiles);
      info(`Logged change: ${filePath}`);
    } catch (err) {
      error(`Error updating recent files: ${err.message}`);
    }
  });
}
