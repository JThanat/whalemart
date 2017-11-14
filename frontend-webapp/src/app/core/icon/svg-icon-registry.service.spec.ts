import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserTestingModule } from '@angular/platform-browser/testing';

import { SVG_ICON_DEFINITIONS, SvgIconRegistry } from './svg-icon-registry.service';

const svgContent = `
<svg width="200" height="200">
  <rect width="200" height="200"/>
</svg>
`;

describe('SvgIconRegistry', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SvgIconRegistry,
        BrowserTestingModule,
        {
          provide: SVG_ICON_DEFINITIONS,
          useFactory: (domSanitizer: DomSanitizer) => [
            {
              key: 'foo',
              fileUrl: domSanitizer.bypassSecurityTrustResourceUrl('/assets/icon/foo.svg')
            }
          ],
          deps: [DomSanitizer]
        }
      ]
    });
  });

  afterEach(inject(
    [HttpTestingController], (httpMock: HttpTestingController) => httpMock.verify()
  ));

  const inj = (fn: (uut: SvgIconRegistry, httpMock: HttpTestingController) => void) => inject(
    [SvgIconRegistry, HttpTestingController], fn
  );

  const expectValidSvg = (svg: SVGSVGElement) => expect(svg.querySelector('rect')).toBeTruthy();

  it('should be able to get SVG element', inj((uut, httpMock) => {
    const svgSpy = jasmine.createSpy('svgSpy');

    uut.getSvgIcon('foo').subscribe(svg => svgSpy(svg));

    const req = httpMock.expectOne({ url: '/assets/icon/foo.svg', method: 'get' });
    expect(svgSpy).toHaveBeenCalledTimes(0);
    req.flush(svgContent);

    expect(svgSpy).toHaveBeenCalledTimes(1);
    expectValidSvg(svgSpy.calls.first().args[0]);
  }));

  it('should cache the request for loading the SVG', inj((uut, httpMock) => {
    const svgSpy1 = jasmine.createSpy('svgSpy1');
    uut.getSvgIcon('foo').subscribe(svg => svgSpy1(svg));

    httpMock.expectOne({ url: '/assets/icon/foo.svg', method: 'get' }).flush(svgContent);
    expectValidSvg(svgSpy1.calls.first().args[0]);

    // Next load
    const svgSpy2 = jasmine.createSpy('svgSpy2');
    uut.getSvgIcon('foo').subscribe(svg => svgSpy2(svg));

    httpMock.expectNone({ url: '/assets/icon/foo.svg', method: 'get' });
    expectValidSvg(svgSpy2.calls.first().args[0]);
  }));

  it('should try to reload SVG on consequence call if the previous one fails',
    inj((uut, httpMock) => {
      const svgSpy1 = jasmine.createSpy('svgSpy1');
      uut.getSvgIcon('foo').subscribe(err => svgSpy1(err));

      httpMock.expectOne({ url: '/assets/icon/foo.svg', method: 'get' })
        .error(new ErrorEvent('some error'));
      expect(svgSpy1.calls.first().args[0]).toBeUndefined();

      // Next load
      const svgSpy2 = jasmine.createSpy('svgSpy2');
      uut.getSvgIcon('foo').subscribe(svg => svgSpy2(svg));

      httpMock.expectOne({ url: '/assets/icon/foo.svg', method: 'get' }).flush(svgContent);
      expectValidSvg(svgSpy2.calls.first().args[0]);
    })
  );

  it('should reuse the same HTTP request for the consecutive same SVG requests',
    inj((uut, httpMock) => {
      const svgSpy1 = jasmine.createSpy('svgSpy1');
      const svgSpy2 = jasmine.createSpy('svgSpy2');

      uut.getSvgIcon('foo').subscribe(svg => svgSpy1(svg));
      uut.getSvgIcon('foo').subscribe(svg => svgSpy2(svg));

      const req = httpMock.expectOne({ url: '/assets/icon/foo.svg', method: 'get' });
      req.flush(svgContent);

      expect(svgSpy1).toHaveBeenCalledTimes(1);
      expect(svgSpy2).toHaveBeenCalledTimes(1);
      expectValidSvg(svgSpy1.calls.first().args[0]);
      expectValidSvg(svgSpy2.calls.first().args[0]);
    })
  );
});
