import { GoogleModule } from './module-loader';

interface GoogleClientInitOption {
  apiKey: string
  clientId: string
  discoveryDocs: string[]
  scope: string
}

export namespace Google {
  export class APIService {
    private initOption: GoogleClientInitOption;
    private google: GoogleModule;

    constructor(option: GoogleClientInitOption) {
      this.initOption = option;
      this.google = GoogleModule;

      GoogleModule.gapi.load('client:auth2', () => {
        GoogleModule.gapi.client.init(this.initOption)
      });
    }

    get auth () {
      return this.google.gapi.auth;
    }
    get client () {
      return this.google.gapi.client;
    }
    get load () {
      return this.google.gapi.load;
    }
  }
}
