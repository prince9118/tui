import fs from 'fs';

import os from 'os';
import path from 'path';

const CONFIG_DIR = path.join(os.homedir(), '.opencode');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

interface Config {
    defaultProvider?: string;
    providers: Record<string, { apiKey: string }>;
}
function readConfig(): Config {
    if (!fs.existsSync(CONFIG_FILE)) {
        return { providers: {} };
    }
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
}

function writeConfig(config: Config): void {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

export function saveApiKey(provider: string, apiKey: string): void {
    const config = readConfig();
    config.providers[provider] = { apiKey };
    writeConfig(config);
}

export function removeApiKey(provider: string): boolean {
    const config = readConfig();
    if (!config.providers[provider]) return false;
    delete config.providers[provider];
    if (config.defaultProvider === provider) delete config.defaultProvider;
    writeConfig(config);
    return true;
}

export function setDefault(provider: string): boolean {
    const config = readConfig();
    if (!config.providers[provider]) return false;
    config.defaultProvider = provider;
    writeConfig(config);
    return true;
}

export function getConfig(): Config {
    return readConfig();
}
