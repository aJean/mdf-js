import ora from 'ora';

/**
 * @file cli 美化
 */

export function createSpiner(text: string) {
  const spinner = ora({
    spinner: {
      interval: 120,
      frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
    },
    text,
  });
  
  return spinner;
}
