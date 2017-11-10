import { Inject, Injectable, InjectionToken } from '@angular/core';

export const STORAGE_OBJ = new InjectionToken<Storage>('Storage object');
export const STORAGE_KEY_PREFIX = new InjectionToken<string>('Storage key prefix');

@Injectable()
export class KeyValueStore {
  constructor(
    @Inject(STORAGE_OBJ) private storage: Storage,
    @Inject(STORAGE_KEY_PREFIX) private storageKeyPrefix: string
  ) { }

  set(key: string, value: string) {
    this.storage.setItem(this.storageKeyPrefix + key, value);
  }

  get(key: string) {
    const val = this.storage.getItem(this.storageKeyPrefix + key);
    if (val === null) {
      return undefined;
    }
    return val;
  }

  delete(key: string) {
    this.storage.removeItem(this.storageKeyPrefix + key);
  }
}
