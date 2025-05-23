export default class AppGenerator {
  #label: string;
  #description: string;

  public constructor(label: string, description: string) {
    this.#label = label;
    this.#description = description;
  }

  public returnObjectRepresentation(): object {
    const jsonObject = {
      '?xml': {
        '@_version': '1.0',
        '@_encoding': 'UTF-8',
      },
      CustomApplication: {
        '@_xmlns': 'http://soap.sforce.com/2006/04/metadata',
        description: {
          '#text': this.#description,
        },
        brand: {
          headerColor: {
            '#text': '#0070D2',
          },
          shouldOverrideOrgTheme: {
            '#text': false,
          },
        },
        formFactors: {
          '#text': 'Large',
        },
        isNavAutoTempTabsDisabled: {
          '#text': false,
        },
        isNavPersonalizationDisabled: {
          '#text': false,
        },
        isNavTabPersistenceDisabled: {
          '#text': false,
        },
        isOmniPinnedViewEnabled: {
          '#text': false,
        },
        label: {
          '#text': this.#label,
        },
        navType: {
          '#text': 'standard',
        },
        tabs: {
          '#text': 'standard-home',
        },
        uiType: {
          '#text': 'Lightning',
        },
      },
    };

    return jsonObject;
  }
}
