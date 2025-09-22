import type { LocalStorageProperty } from "./local-storage-property.enum";

export class LocalStorageService {
  public static create() {
    return new LocalStorageService();
  }

  public setItem<T = unknown>(key: LocalStorageProperty, data: T) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getItemAsArray<T = object>(key: LocalStorageProperty): T[] {
    const data = localStorage.getItem(key);

    if (data) {
      return JSON.parse(data);
    }

    return [];
  }

  public removeItem(key: LocalStorageProperty) {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }
}
