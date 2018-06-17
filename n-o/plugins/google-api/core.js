/**
 * Inject google api.js into the head and return a reference to the script
 * @returns {Promise} containing a reference to window.gapi
 */
const getGAPI = () => {
  return new Promise((resolve, reject) => {
    const googleScript = document.createElement('script');
    googleScript.src = 'https://apis.google.com/js/api.js';
    googleScript.addEventListener('load', () => {
      if (window.gapi) {
        resolve(window.gapi);
      } else {
        reject();
      }
    });
    googleScript.addEventListener('error', (error) => {
      reject(error);
    });
    document.head.appendChild(googleScript);
  });
};

export {
  getGAPI,
};
