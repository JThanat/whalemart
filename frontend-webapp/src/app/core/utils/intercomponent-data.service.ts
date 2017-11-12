import { Injectable } from '@angular/core';

interface DataMap {
  /**
   * For testing.
   */
  test: string;
}

@Injectable()
export class IntercomponentDataService {
  private data = new Map<string, any>();

  set<K extends keyof DataMap>(key: K, value: DataMap[K]) {
    if (this.data.has(key)) {
      throw new Error('Key already existed');
    }
    this.data.set(key, value);
  }

  get<K extends keyof DataMap>(key: keyof DataMap) {
    if (!this.data.has(key)) {
      throw new Error('No specified key');
    }
    const value = this.data.get(key) as DataMap[K];
    this.data.delete(key);
    return value;
  }
}
