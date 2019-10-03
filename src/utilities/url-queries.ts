export const parse = (searchParam: string) => {
  const normalized = searchParam.startsWith('?') ? searchParam.substring(1) : searchParam;
  return normalized
    .split('&')
    .reduce((acc: Record<string, string | undefined>, entryString) => {
      const [k, v] = entryString.split('=');
      acc[k] = decodeURIComponent(v);
      return acc;
    }, {})
  ;
};
