import { Injectable } from '@angular/core';

export interface IntercomponentDataMap {
  /**
   * For testing.
   */
  test: string;
  /**
   * For Facebook registration.
   */
  fbRegister: {
    fbAccessToken: string;
    firstName: string;
    lastName: string;
    email?: string;
    profileImageUrl: string;
  };
}

@Injectable()
export class IntercomponentDataService {
  private data = new Map<string, any>();

  set<K extends keyof IntercomponentDataMap>(key: K, value: IntercomponentDataMap[K]) {
    if (this.data.has(key)) {
      throw new Error('Key already existed');
    }
    this.data.set(key, value);
  }

  has<K extends keyof IntercomponentDataMap>(key: K) {
    return this.data.has(key);
  }

  get<K extends keyof IntercomponentDataMap>(key: K) {
    if (!this.data.has(key)) {
      throw new Error('No specified key');
    }
    const value = this.data.get(key) as IntercomponentDataMap[K];
    this.data.delete(key);
    return value;
  }
}
