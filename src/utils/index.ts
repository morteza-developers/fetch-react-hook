import { ICacheStrategy } from "../type";


const cache = new Map<string, any>()

export class MemoryCacheStrategy implements ICacheStrategy {
  setItem<T extends unknown>(key: string, data: T) {
    cache.set(key, data);
  }
  getItem<T extends unknown>(key: string) {
    return cache?.get(key) as T;
  }
  removeItem(key: string) {
    return cache.delete(key);
  }
  clear() {
    cache.clear();
  }
}

export class LocalStorageCacheStrategy implements ICacheStrategy {
  setItem<T extends unknown>(key: string, data: T) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  getItem<T extends unknown>(key: string) {
    const data = localStorage.getItem(key);
    return JSON.parse(data as string) as T;
  }
  removeItem(key: string) {
    localStorage.removeItem(key);
    return true;
  }
  clear() {
    localStorage.clear();
  }
}
