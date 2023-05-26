export function simulateFetch<T>(callback: () => T) {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      try {
        return resolve(callback());
      } catch (err) {
        return reject(err);
      }
    }, 300);
  });
}
