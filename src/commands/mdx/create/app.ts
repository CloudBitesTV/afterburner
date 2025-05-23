import fs from 'node:fs/promises';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import { XMLBuilder } from 'fast-xml-parser';
import AppGenerator from '../../../metadataTypes/appGenerator.js';
import { defaultXmlOptions } from '../../../common/configs.js';

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('afterburner', 'mdx.create.app');

export type MdxCreateAppResult = {
  path: string;
};

export default class MdxCreateApp extends SfCommand<MdxCreateAppResult> {
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
    'output-dir': Flags.directory({
      summary: messages.getMessage('flags.output-dir.summary'),
      char: 'd',
      default: 'force-app/main/default/applications',
    }),
    description: Flags.string({
      summary: messages.getMessage('flags.description.summary'),
      char: 'c',
    }),
  };

  public async run(): Promise<MdxCreateAppResult> {
    const { flags } = await this.parse(MdxCreateApp);

    const generator = new AppGenerator(flags.name ?? '', flags.description ?? '');

    const metadataJson = generator.returnObjectRepresentation();

    const parser = new XMLBuilder(defaultXmlOptions);
    const xml = parser.build(metadataJson);

    await fs.mkdir(flags['output-dir'], { recursive: true });
    await fs.writeFile(`${flags['output-dir']}/${flags.name}.app-meta.xml`, xml);

    const name = flags.name ?? 'world';
    this.log(`hello ${name} from src/commands/mdx/create/app.ts`);
    return {
      path: 'src/commands/mdx/create/app.ts',
    };
  }
}
