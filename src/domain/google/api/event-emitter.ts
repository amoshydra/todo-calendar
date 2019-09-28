export const eventEmitter = (() => {
  const map: { [key: string]: Function } = {};

  return {
    listen(name: string, callback: Function) {
      map[name] = callback;
    },
    emit(name: string) {
      map[name]();
    }
  };
})();
