import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';

export const STORAGE_OBJ = new InjectionToken<Storage>('Storage object');
export const STORAGE_KEY_PREFIX = new InjectionToken<string>('Storage key prefix');

@Injectable()
export class KeyValueStore {
  private storageKeyPrefix: string;

  constructor(
    @Inject(STORAGE_OBJ) private storage: Storage,
    @Optional() @Inject(STORAGE_KEY_PREFIX) storageKeyPrefix: string | null
  ) {
    this.storageKeyPrefix = storageKeyPrefix || '';
  }

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
