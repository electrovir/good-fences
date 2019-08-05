import * as fs from 'fs';
import * as path from 'path';
import RawConfig from '../types/rawConfig/RawConfig';
import Config from '../types/config/Config';
import normalizePath from './normalizePath';
import RawDependencyRule from '../types/rawConfig/RawDependencyRule';
import RawExportRule from '../types/rawConfig/RawExportRule';
import ExportRule from '../types/config/ExportRule';

export default function loadConfig(file: string): Config {
    // Load the raw config
    let rawConfig: RawConfig = JSON.parse(fs.readFileSync(file).toString());

    // Normalize it
    const config: Config = {
        path: normalizePath(path.dirname(file)),
        tags: rawConfig.tags,
        exports: normalizeExportRules(rawConfig.exports),
        dependencies: normalizeDependencyRules(rawConfig.dependencies),
        imports: rawConfig.imports,
    };

    return config;
}

function normalizeDependencyRules(rules: RawDependencyRule[]) {
    if (!rules) {
        return null;
    }

    return rules.map(dependency => {
        // Upgrade simple strings to DependencyRule structs
        if (typeof dependency == 'string') {
            return {
                dependency,
                accessibleTo: null,
            };
        } else {
            return dependency;
        }
    });
}

export function normalizeExportRules(rules: RawExportRule[]): ExportRule[] {
    if (!rules) {
        return null;
    }

    return rules.map(exportRule => {
        // Upgrade simple strings to ExportRule structs
        if (typeof exportRule == 'string') {
            return {
                modules: exportRule,
                accessibleTo: null,
            };
        } else {
            return exportRule;
        }
    });
}
