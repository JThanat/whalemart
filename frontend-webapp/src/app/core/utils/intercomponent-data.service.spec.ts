import { IntercomponentDataService } from './intercomponent-data.service';

describe('IntercomponentDataService', () => {
  it('should be able to get a value', () => {
    const uut = new IntercomponentDataService();

    expect(uut.has('test')).toBe(false);

    uut.set('test', 'foo');
    expect(uut.has('test')).toBe(true);

    expect(uut.get('test')).toBe('foo');
    expect(uut.has('test')).toBe(false);

    uut.set('test', 'bar');
    expect(uut.has('test')).toBe(true);

    expect(uut.get('test')).toBe('bar');
    expect(uut.has('test')).toBe(false);
  });

  it('should throw error on setting using same key twice', () => {
    const uut = new IntercomponentDataService();

    uut.set('test', 'foo');
    expect(() => uut.set('test', 'bar')).toThrowError(/already exist/);
  });

  it('should throw error on getting using same key twice', () => {
    const uut = new IntercomponentDataService();

    uut.set('test', 'foo');
    expect(uut.get('test')).toBe('foo');
    expect(() => uut.get('test')).toThrowError(/No specified/);

    uut.set('test', 'bar');
    expect(uut.get('test')).toBe('bar');
  });

  it('should throw error on getting the data that has not been set', () => {
    const uut = new IntercomponentDataService();

    expect(() => uut.get('test')).toThrowError(/No specified/);
  });
});
