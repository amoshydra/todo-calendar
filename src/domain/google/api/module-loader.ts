import { get } from 'lodash';
import { eventEmitter } from './event-emitter';

const execPaths: string[] = [];
const gapiLoaderPromises: {
  module: Promise<typeof gapi>
  load: Promise<void>
  init: Promise<void>
} = {
  module: new Promise((resolve, reject) => {
    if (process.server) return;
    const retrievalKey = 'gapi';

    const googleScript = document.createElement('script');
    googleScript.src = 'https://apis.google.com/js/api.js';
    googleScript.addEventListener('load', () => {
      if (!(retrievalKey in window)) {
        return reject(new Error('Google API is not loaded correctly'));
      }
      const gapi = (window as any)[retrievalKey];
      resolve(gapi);
    });
    googleScript.addEventListener('error', (error) => {
      reject(error);
    });
    document.head.appendChild(googleScript);
  }),
  load: new Promise((resolve) => {
    eventEmitter.listen('loadCompleted', resolve);
  }),
  init: new Promise((resolve) => {
    eventEmitter.listen('initCompleted', resolve);
  }),
}

const proxyReturn: any = new Proxy((() => {}), {
  get(_obj, propertyKey: string) {
    execPaths.push(propertyKey);
    return proxyReturn;
  },
  async apply(_obj, thisArg, argumentList) {
    const paths = execPaths.splice(0, execPaths.length)
    const gapi = await gapiLoaderPromises.module;

    const waitBeforeExecute = async (keys: string[], callback = (() => {})) => {
      for (const key of keys) {
        await (gapiLoaderPromises as any)[key];
      }
      console.log(paths)
      const promise = get(gapi, paths).apply(thisArg, argumentList);
      if (promise && ('then' in promise)) {
        promise.then(callback);
      } else {
        callback();
      }
      return promise;
    };

    // Ensure call sequences
    switch (paths.join('.')) {
      case 'load': {
        return waitBeforeExecute([], () => eventEmitter.emit('loadCompleted'));
      }
      case 'client.init': {
        return waitBeforeExecute(['load'], () => eventEmitter.emit('initCompleted'));
      }
      default: {
        return waitBeforeExecute(['load', 'init']);
      }
    }
  }
});

export interface GoogleModule {
  gapi: typeof gapi
}
export const GoogleModule: GoogleModule = {
  gapi: proxyReturn,
};
