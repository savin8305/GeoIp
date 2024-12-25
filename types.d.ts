export interface Country {
    cca2: string; // ISO 3166-1 alpha-2 country code
    currencies: {
      [code: string]: {
        symbol: string;
        name: string;
      };
    };
    languages: {
      [code: string]: string;
    };
  }
  