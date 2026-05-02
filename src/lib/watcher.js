import chokidar from 'chokidar';
import path from 'path';

/**
 * Starts a file watcher on the specified directory.
 * @param {string} directory - The directory to watch.
 * @param {function} callback - Function called when a file changes.
 * @returns {chokidar.FSWatcher}
 */
export const startWatcher = (directory, callback) => {
  const watcher = chokidar.watch(directory, {
    ignored: [
      /(^|[\/\\])\../, // ignore dotfiles
      '**/node_modules/**',
      '**/.git/**',
      '**/.capsule/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/coverage/**',
      '**/vendor/**'
    ],
    persistent: true,
    ignoreInitial: true
  });

  watcher.on('change', (filePath) => {
    callback(path.relative(directory, filePath));
  });

  watcher.on('add', (filePath) => {
    callback(path.relative(directory, filePath));
  });

  return watcher;
};

export default {
  startWatcher
};
