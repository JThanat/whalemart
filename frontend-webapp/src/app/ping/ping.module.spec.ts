import { PingModule } from './ping.module';

describe('PingModule', () => {
  let pingModule: PingModule;

  beforeEach(() => {
    pingModule = new PingModule();
  });

  it('should create an instance', () => {
    expect(pingModule).toBeTruthy();
  });
});
