const MAX_HISTORY_LIMIT = 20;
const LOCAL_STORAGE_NAME = 'command-history';

export const mutations = {
  add(state, item) {
    state.history.push(item);
    while (state.history.length > MAX_HISTORY_LIMIT) {
      state.history.shift();
    }
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(state.history));
  },
};

export const state = () => {
  const commandHistoryJson = localStorage.getItem(LOCAL_STORAGE_NAME) || '';
  let commandHistory = [];
  try {
    commandHistory = JSON.parse(commandHistoryJson) || [];
    if (!Array.isArray(commandHistory)) commandHistory = [];
  } catch (error) {
    /* eslint no-console: off */
    console.warn(error);
  }
  return {
    history: commandHistory,
  };
};
