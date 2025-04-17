import fs from 'node:fs/promises';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import { XMLBuilder } from 'fast-xml-parser';
import PermissionSetGenerator from '../../../metadataTypes/permissionSetGenerator.js';
import { defaultXmlOptions } from '../../../common/configs.js';

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('afterburner', 'mdx.create.permissionset');

export type MdxCreatePermissionsetResult = {
  path: string;
};

export default class MdxCreatePermissionset extends SfCommand<MdxCreatePermissionsetResult> {
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
    label: Flags.string({
      summary: messages.getMessage('flags.label.summary'),
      char: 'l',
      required: true,
    }),
    'has-activation-required': Flags.boolean({
      summary: messages.getMessage('flags.has-activation-required.summary'),
      char: 'a',
    }),
    'output-dir': Flags.directory({
      summary: messages.getMessage('flags.output-dir.summary'),
      char: 'd',
      default: 'force-app/main/default/permissionsets',
    }),
  };

  public async run(): Promise<MdxCreatePermissionsetResult> {
    const { flags } = await this.parse(MdxCreatePermissionset);

    const generator = new PermissionSetGenerator(
      flags.label,
      flags.description ?? '',
      flags['has-activation-required']
    );

    // TODO: extract out XML options and writing logic to separate class;
    const metadataJson = generator.returnObjectRepresentation();

    const parser = new XMLBuilder(defaultXmlOptions);
    const xml = parser.build(metadataJson);

    await fs.mkdir(flags['output-dir'], { recursive: true });
    await fs.writeFile(`${flags['output-dir']}/${flags.name}.permissionset-meta.xml`, xml);

    return {
      path: 'src/commands/mdx/create/permissionset.ts',
    };
  }
}
