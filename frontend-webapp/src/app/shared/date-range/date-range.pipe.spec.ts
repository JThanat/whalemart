import { DateRangePipe } from './date-range.pipe';

describe('DateRangePipe', () => {
  it('create an instance', () => {
    const pipe = new DateRangePipe(null as any);
    expect(pipe).toBeTruthy();
  });
});
