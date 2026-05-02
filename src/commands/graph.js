import { success, error, info } from '../lib/utils.js';
import { getGraphifyFileStatus, getRawGraphifyReport, writeGraphSummary } from '../lib/storage.js';

/**
 * Checks for the presence of Graphify output files.
 */
export async function status() {
  try {
    const files = await getGraphifyFileStatus();
    
    if (!files.report && !files.json && !files.html) {
      info('No Graphify output found. Run graphify first or use fluxtrail sync if you want automatic mapping.');
      return;
    }

    console.log(`Graphify report: ${files.report ? 'found' : 'missing'}`);
    console.log(`Graphify JSON graph: ${files.json ? 'found' : 'missing'}`);
    console.log(`Graphify HTML map: ${files.html ? 'found' : 'missing'}`);
  } catch (err) {
    error(`Failed to check graph status: ${err.message}`);
  }
}

/**
 * Imports the Graphify report into a compact summary file.
 */
export async function importReport() {
  try {
    const report = await getRawGraphifyReport();
    
    if (!report) {
      info('No Graphify report found to import. Run graphify first.');
      return;
    }

    // Compact the report (approx 2500 words limit)
    const words = report.split(/\s+/);
    const compactReport = words.length > 2500 
      ? words.slice(0, 2500).join(' ') + '\n\n... (report truncated for context efficiency)'
      : report;

    await writeGraphSummary(compactReport);
    success('Successfully imported and compacted Graphify report to .capsule/graph-summary.md');
  } catch (err) {
    error(`Graph import failed: ${err.message}`);
  }
}
