
import { Command } from 'commander';
import chalk from 'chalk';
import { saveApiKey } from './config';

const SUPPORTED_PROVIDERS = ['gemini', 'claude', 'openai'];

export const loginCommand = new Command("login")
    .description('Save API key ofs provider')
    .requiredOption('-p, --provider <providerName>', 'Name of the provider (gemini, claude, openai)')
    .requiredOption('-a, --api_key <apiKey>', 'Your API key')
    .action((options) => {
        const provider = options.provider.toLowerCase();
        if (!SUPPORTED_PROVIDERS.includes(provider)) {
            console.error(chalk(`Unknown provider "${provider}". Supported: ${SUPPORTED_PROVIDERS.join(', ')}`));
            process.exit(1);
        }
        saveApiKey(provider, options.api_key);
        console.log(chalk.green(`API key saved for ${chalk(provider)}`))
    })
