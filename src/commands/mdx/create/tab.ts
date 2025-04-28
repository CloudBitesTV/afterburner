import fs from 'node:fs/promises';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import { XMLBuilder } from 'fast-xml-parser';
import TabGenerator from '../../../metadataTypes/tabGenerator.js';
import { defaultXmlOptions } from '../../../common/configs.js';

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
      required: true,
    }),
    description: Flags.string({
      summary: messages.getMessage('flags.description.summary'),
      char: 'c',
    }),
    'output-dir': Flags.directory({
      summary: messages.getMessage('flags.output-dir.summary'),
      char: 'd',
      default: 'force-app/main/default/tabs',
    }),
  };

  public async run(): Promise<MdxCreateTabResult> {
    const { flags } = await this.parse(MdxCreateTab);

    const generator = new TabGenerator(flags.description ?? '');

    const metadataJson = generator.returnObjectRepresentation();

    const parser = new XMLBuilder(defaultXmlOptions);
    const xml = parser.build(metadataJson);

    // await fs.mkdir('force-app/main/default/tabs', { recursive: true });
    // await fs.writeFile(`force-app/main/default/tabs/${flags.name}.tab-meta.xml`, xml);
    await fs.mkdir(flags['output-dir'], { recursive: true });
    await fs.writeFile(`${flags['output-dir']}/${flags.name}.tab-meta.xml`, xml);

    const name = flags.name ?? 'world';
    this.log(`hello ${name} from src/commands/mdx/create/tab.ts`);
    return {
      path: 'src/commands/mdx/create/tab.ts',
    };
  }
}
