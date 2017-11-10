import { KeyValueStore } from './key-value-store.service';

describe('KeyValueStore', () => {
  beforeEach(() => sessionStorage.clear());
  afterAll(() => sessionStorage.clear());

  it('should be able to save and get key-value', () => {
    const keyValueStore = new KeyValueStore(sessionStorage, 'wm_');

    keyValueStore.set('hello', 'world');
    expect(sessionStorage.getItem('wm_hello')).toBe('world');
    expect(keyValueStore.get('hello')).toBe('world');

    keyValueStore.set('hello', 'new_world');
    expect(sessionStorage.getItem('wm_hello')).toBe('new_world');
    expect(keyValueStore.get('hello')).toBe('new_world');

    keyValueStore.set('foo', 'bar');
    expect(sessionStorage.getItem('wm_foo')).toBe('bar');
    expect(keyValueStore.get('foo')).toBe('bar');
  });

  it('should be able to delete key-value', () => {
    const keyValueStore = new KeyValueStore(sessionStorage, 'prefix_');

    expect(sessionStorage.getItem('prefix_hello')).toBe(null);
    expect(keyValueStore.get('hello')).toBe(undefined);

    keyValueStore.set('hello', 'world');
    expect(sessionStorage.getItem('prefix_hello')).toBe('world');
    expect(keyValueStore.get('hello')).toBe('world');

    keyValueStore.delete('hello');
    expect(sessionStorage.getItem('prefix_hello')).toBe(null);
    expect(keyValueStore.get('hello')).toBe(undefined);

    keyValueStore.set('hello', 'NEWWORLD');
    expect(sessionStorage.getItem('prefix_hello')).toBe('NEWWORLD');
    expect(keyValueStore.get('hello')).toBe('NEWWORLD');
  });
});
