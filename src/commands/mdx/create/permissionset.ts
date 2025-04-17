import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
// const { XMLParser, XMLBuilder, XMLValidator } = require('fast-xml-parser');

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
      required: false,
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
    }),
  };

  public async run(): Promise<MdxCreatePermissionsetResult> {
    const { flags } = await this.parse(MdxCreatePermissionset);

    const name = flags.name ?? 'world';
    this.log(`hello ${name} from src/commands/mdx/create/permissionset.ts`);
    return {
      path: 'src/commands/mdx/create/permissionset.ts',
    };
  }
}

/*

<?xml version="1.0" encoding="UTF-8"?>
<PermissionSet xmlns="http://soap.sforce.com/2006/04/metadata">
    <description>This is a demo</description>
    <hasActivationRequired>false</hasActivationRequired>
    <label>demo</label>
</PermissionSet>

*/
