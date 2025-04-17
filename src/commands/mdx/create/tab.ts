import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
// import { defaultXmlOptions } from '../../../common/configs.js';

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('afterburner', 'mdx.create.tab');

export type MdxCreateTabResult = {
  path: string;
};

export default class MdxCreateTab extends SfCommand<MdxCreateTabResult> {
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
    description: Flags.string({
      summary: messages.getMessage('flags.description.summary'),
      char: 'c',
    }),
  };

  public async run(): Promise<MdxCreateTabResult> {
    const { flags } = await this.parse(MdxCreateTab);

    // const parser = new XMLBuilder(defaultXmlOptions);

    const name = flags.name ?? 'world';
    this.log(`hello ${name} from src/commands/mdx/create/tab.ts`);
    return {
      path: 'src/commands/mdx/create/tab.ts',
    };
  }
}
