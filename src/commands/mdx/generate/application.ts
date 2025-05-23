import { SfCommand } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import { input } from '@inquirer/prompts';

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
    // const { flags } = await this.parse(MdxGenerateApplication);

    const answer = await input({ message: 'What do you want the app to be called?' });

    this.log(`hello ${answer} from src/commands/mdx/generate/application.ts`);
    return {
      path: 'src/commands/mdx/generate/application.ts',
    };
  }
}
