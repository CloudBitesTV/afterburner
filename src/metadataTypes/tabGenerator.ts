export default class TabGenerator {
  #description: string;
  #motif: string;
  #customObject: boolean;
  #mobileReady: boolean;

  public constructor(description: string) {
    this.#description = description;
    this.#motif = 'custom9: Lightning';
    this.#customObject = true;
    this.#mobileReady = true;
  }

  public returnObjectRepresentation(): object {
    const jsonObject = {
      '?xml': {
        '@_version': '1.0',
        '@_encoding': 'UTF-8',
      },
      CustomTab: {
        '@_xmlns': 'http://soap.sforce.com/2006/04/metadata',
        description: {
          '#text': this.#description,
        },
        customObject: {
          '#text': this.#customObject,
        },
        mobileReady: {
          '#text': this.#mobileReady,
        },
        motif: {
          '#text': this.#motif,
        },
      },
    };

    return jsonObject;
  }
}
