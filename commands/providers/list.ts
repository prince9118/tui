import { Command } from 'commander';
import chalk from 'chalk';

const providers = [
    { name: 'claude',  description: 'Anthropic Claude (claude-3.5, claude-4)' },
    { name: 'gemini',  description: 'Google Gemini (gemini-1.5, gemini-2.0)' },
    { name: 'openai',  description: 'OpenAI GPT (gpt-4o, gpt-4-turbo)' }
];

export const listProvidersCommand = new Command("list")
    .description('List all supported providers')
    .action(() => {
        console.log(chalk('\Providers List:\n'));
        providers.forEach(p => {
            console.log(`${chalk(p.name.padEnd(10))} ${chalk(p.description)}`);
        });
        console.log();
    });

