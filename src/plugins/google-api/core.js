/**
 * Inject google api.js into the head and return a reference to the script
 * @returns {Promise} containing a reference to window.gapi
 */
const getGAPI = () => new Promise((resolve, reject) => {
  if (process.server) { return; }

  const googleScript = document.createElement('script');
  googleScript.src = 'https://apis.google.com/js/api.js';
  googleScript.addEventListener('load', () => {
    if (window.gapi) {
      resolve(window.gapi);
    } else {
      reject(new Error('Google API is not loaded correctly'));
    }
  });
  googleScript.addEventListener('error', (error) => {
    reject(error);
  });
  document.head.appendChild(googleScript);
});

export default getGAPI;
