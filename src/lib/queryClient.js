const cache = new Map();

const normalizeKey = (key) => {
  if (Array.isArray(key)) {
    return JSON.stringify(key);
  }

  return String(key);
};

const queryClient = {
  getQueryData: (key) =>
    cache.get(normalizeKey(key)),

  setQueryData: (key, data) => {
    const normalizedKey = normalizeKey(key);
    cache.set(normalizedKey, data);
    return data;
  },

  invalidateQueries: (prefix) => {
    const normalizedPrefix = normalizeKey(prefix);

    Array.from(cache.keys()).forEach((key) => {
      if (key.startsWith(normalizedPrefix)) {
        cache.delete(key);
      }
    });
  },

  clear: () => {
    cache.clear();
  },
};

export default queryClient;
