export default class PermissionSetGenerator {
  #label: string;
  #description: string;
  #activationRequired: boolean;

  public constructor(label: string, description: string, activationRequired: boolean) {
    this.#label = label;
    this.#description = description;
    this.#activationRequired = activationRequired;
  }

  public returnObjectRepresentation(): object {
    const jsonObject = {
      '?xml': {
        '@_version': '1.0',
        '@_encoding': 'UTF-8',
      },
      PermissionSet: {
        '@_xmlns': 'http://soap.sforce.com/2006/04/metadata',
        description: {
          '#text': this.#description,
        },
        hasActivationRequired: {
          '#text': this.#activationRequired,
        },
        label: {
          '#text': this.#label,
        },
      },
    };

    return jsonObject;
  }
}
