import Options from '../types/Options';
import getOptions, { setOptions } from '../utils/getOptions';
import validateFile from '../validation/validateFile';
import TypeScriptProgram from './TypeScriptProgram';
import normalizePath from '../utils/normalizePath';
import validateRequiredFences from '../validation/validateRequiredFences';

export function run(options: Options) {
    // Store options so they can be globally available
    setOptions(options);

    validateRequiredFences();

    // Run validation
    let tsProgram = new TypeScriptProgram(getOptions().project);
    let files = tsProgram.getSourceFiles();
    files.forEach(file => {
        validateFile(normalizePath(file), tsProgram);
    });
}
