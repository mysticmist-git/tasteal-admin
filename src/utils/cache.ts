/**
 * Creates a caching function that memoizes the results of a given function.
 *
 * @param {function} fn - The function to be memoized.
 * @return {function} The memoized function.
 */
function createCacheFunction<TValue extends unknown[], TResult>(
  fn: (...args: TValue) => TResult
) {
  const cache: Record<string, TResult> = {};

  return (...args: TValue) => {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    } else {
      const result = fn(...args);
      cache[key] = result;
      return result;
    }
  };
}

/**
 * Creates a cached version of an asynchronous function.
 *
 * @param {function} fn - The original asynchronous function.
 * @return {function} - The cached version of the function.
 */
function createCacheAsyncFunction<TValue extends unknown[], TResult>(
  fn: (...args: TValue) => Promise<TResult> // Change the return type to Promise<TResult>
) {
  const cache: Record<string, TResult> = {};

  return async (...args: TValue) => {
    // Add the async keyword
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    } else {
      const result = await fn(...args); // Use await to wait for the asynchronous result
      cache[key] = result;
      return result;
    }
  };
}

export { createCacheAsyncFunction, createCacheFunction };
