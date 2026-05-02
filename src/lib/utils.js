import chalk from 'chalk';

export const success = (msg) => console.log(chalk.green('✔ ') + msg);
export const error = (msg) => console.error(chalk.red('✖ ') + msg);
export const info = (msg) => console.log(chalk.blue('ℹ ') + msg);
export const warn = (msg) => console.log(chalk.yellow('⚠ ') + msg);

export default {
  success,
  error,
  info,
  warn
};
