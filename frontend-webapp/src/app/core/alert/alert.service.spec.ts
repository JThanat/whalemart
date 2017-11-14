import { AlertService } from './alert.service';

describe('AlertService', () => {
  it('should initially return an observable of undefined', () => {
    const alertSpy = jasmine.createSpy('alertSpy');
    const uut = new AlertService();
    uut.getAlert().subscribe(alert => alertSpy(alert));
    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy.calls.first().args).toEqual([undefined]);
  });

  it('should emit an alert when showing an alert', () => {
    const alertSpy = jasmine.createSpy('alertSpy');
    const uut = new AlertService();
    uut.getAlert().subscribe(alert => alertSpy(alert));

    uut.show({ message: 'Test 1', type: 'info' });
    expect(alertSpy).toHaveBeenCalledTimes(2);
    expect(alertSpy.calls.mostRecent().args).toEqual([{ message: 'Test 1', type: 'info' }]);

    uut.show({ message: 'Test 2', type: 'success' });
    expect(alertSpy).toHaveBeenCalledTimes(3);
    expect(alertSpy.calls.mostRecent().args).toEqual([{ message: 'Test 2', type: 'success' }]);

    uut.show({ message: 'Test 3', type: 'warning' });
    expect(alertSpy).toHaveBeenCalledTimes(4);
    expect(alertSpy.calls.mostRecent().args).toEqual([{ message: 'Test 3', type: 'warning' }]);

    uut.show({ message: 'Test 4', type: 'danger' });
    expect(alertSpy).toHaveBeenCalledTimes(5);
    expect(alertSpy.calls.mostRecent().args).toEqual([{ message: 'Test 4', type: 'danger' }]);
  });

  it('should emit undefined when closing an alert', () => {
    const alertSpy = jasmine.createSpy('alertSpy');
    const uut = new AlertService();
    uut.getAlert().subscribe(alert => alertSpy(alert));

    uut.show({ message: 'Test 1', type: 'info' });
    expect(alertSpy).toHaveBeenCalledTimes(2);
    expect(alertSpy.calls.mostRecent().args).toEqual([{ message: 'Test 1', type: 'info' }]);

    uut.close();
    expect(alertSpy).toHaveBeenCalledTimes(3);
    expect(alertSpy.calls.mostRecent().args).toEqual([undefined]);

    uut.show({ message: 'Test 2', type: 'info' });
    expect(alertSpy).toHaveBeenCalledTimes(4);
    expect(alertSpy.calls.mostRecent().args).toEqual([{ message: 'Test 2', type: 'info' }]);
  });

  it('should behave like a BehaviorSubject', () => {
    const alertSpy = jasmine.createSpy('alertSpy');
    const uut = new AlertService();

    uut.show({ message: 'Test 1', type: 'info' });
    uut.getAlert().subscribe(alert => alertSpy(alert));

    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy.calls.mostRecent().args).toEqual([{ message: 'Test 1', type: 'info' }]);
  });
});
