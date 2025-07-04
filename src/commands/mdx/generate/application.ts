import { SfCommand } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import { input, confirm } from '@inquirer/prompts';
import MdxCreateApp from '../create/app.js';

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('afterburner', 'mdx.generate.application');

export type MdxGenerateApplicationResult = {
  path: string;
};

export default class MdxGenerateApplication extends SfCommand<MdxGenerateApplicationResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {};

  public async run(): Promise<MdxGenerateApplicationResult> {
    const appNameAnswer = await input({ message: 'What do you want the app to be called?' });
    this.log(`Our app will be called ${appNameAnswer}`);

    const app = new MdxCreateApp(['-n', appNameAnswer], this.config);
    await app.run();

    const objectNameAnswer = await input({ message: 'What is the name of the object you wish to create?' });
    this.log(`Our object will be called ${objectNameAnswer}`);

    // Try using the plugin's command reference
    // await this.config.runCommand('schema:generate:sobject', ['-l', objectNameAnswer]);
    await this.config.runCommand('version');

    const startsWithVowelAnswer = await confirm({ message: "Does the object's name start with a vowel sound?" });
    this.log(`Does our object start with a vowel? ${startsWithVowelAnswer}`);

    return {
      path: 'src/commands/mdx/generate/application.ts',
    };
  }
}
