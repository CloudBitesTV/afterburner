import * as child from 'node:child_process';
import * as util from 'node:util';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import { input, confirm } from '@inquirer/prompts';
import MdxCreateApp from '../create/app.js';

const exec = util.promisify(child.exec);

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('afterburner', 'mdx.generate.application');

export type MdxGenerateApplicationResult = {
  path: string;
};

export default class MdxGenerateApplication extends SfCommand<MdxGenerateApplicationResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    name: Flags.string({
      summary: messages.getMessage('flags.name.summary'),
      description: messages.getMessage('flags.name.description'),
      char: 'n',
      required: false,
    }),
  };

  public async run(): Promise<MdxGenerateApplicationResult> {
    const appNameAnswer = await input({ message: 'What do you want the app to be called?' });
    this.log(`Our app will be called ${appNameAnswer}`);

    const app = new MdxCreateApp(['-n', appNameAnswer], this.config);
    await app.run();

    const objectNameAnswer = await input({ message: 'What is the name of the object you wish to create?' });
    this.log(`Our object will be called ${objectNameAnswer}`);

    const startsWithVowelAnswer = await confirm({ message: "Does the object's name start with a vowel sound?" });
    this.log(`Does our object start with a vowel? ${startsWithVowelAnswer}`);

    const version = await exec(`sf schema generate sobject --label ${objectNameAnswer}`);
    this.log(version.stdout);

    return {
      path: 'src/commands/mdx/generate/application.ts',
    };
  }
}
