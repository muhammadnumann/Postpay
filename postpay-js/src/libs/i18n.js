/**
 * Simple Javascript i18n
 * @author David Tran
 */
class i18n {
  _translations = {};
  _language = 'en';
  t = null;

  constructor() {
    this.t = this.translate;
    this._language = this.getBrowserLanguage();
    if (['ar', 'en'].includes(this._language) === false) {
      this._language = 'en';
    }
  }

  getBrowserLanguage = () => {
    let languageCode = navigator.languages
      ? navigator.languages[0]
      : navigator.language;
    languageCode = languageCode.substr(0, 2);
    return languageCode;
  };

  addTransalation = (language, data) => {
    this._translations[language] = data;
  };

  setLanguage = (language) => {
    this._language = language;
  };

  getTranslateFunction = (language) => {
    return (key, values) => {
      return this.translate(key, values, language);
    };
  };

  translate = (key, values, language) => {
    let targetLanguage =
      language || this._language || this.getBrowserLanguage();
    if (targetLanguage) targetLanguage = targetLanguage.substr(0, 2);

    if (!this._translations[targetLanguage]) {
      targetLanguage = 'en';
    }

    const text = this._translations[targetLanguage][key];

    if (!text) return key;

    let formatted = text;
    if (typeof values == 'object') {
      for (let value in values) {
        const regexp = new RegExp('\\{' + value + '\\}', 'gi');
        formatted = formatted.replace(regexp, values[value]);
      }
    }
    return formatted;
  };
}

const instance = new i18n();

export default instance;
