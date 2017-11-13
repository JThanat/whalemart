import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, SecurityContext } from '@angular/core';
import { DOCUMENT, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError, map, publish, tap } from 'rxjs/operators';

export interface SvgIconDefinition {
  key: string;
  fileUrl: SafeResourceUrl;
}

export const SVG_ICON_DEFINITIONS = new InjectionToken<SvgIconDefinition[]>('SVG Icon Definition');

@Injectable()
export class SvgIconRegistry {
  private fetchingSvgIcons = new Map<string, Observable<SVGSVGElement | undefined>>();
  private svgIconsCache = new Map<string, SVGSVGElement>();

  constructor(
    @Inject(SVG_ICON_DEFINITIONS) private svgIconDefinitions: SvgIconDefinition[],
    private domSanitizer: DomSanitizer,
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {  }

  getSvgIcon(key: string) {
    const cachedSvg = this.svgIconsCache.get(key);
    if (cachedSvg) {
      return observableOf(cachedSvg);
    }

    const svg = this.fetchingSvgIcons.get(key);
    if (svg) {
      return svg;
    }

    const definition = this.svgIconDefinitions.find(def => def.key === key);
    if (!definition) {
      throw new Error(`No SVG with specified key`);
    }

    const url = this.domSanitizer.sanitize(SecurityContext.RESOURCE_URL, definition.fileUrl);
    if (!url) {
      throw new Error('Invalid SVG URL');
    }

    const newSvg = this.createSvgIconObservable(definition.key, url);
    this.fetchingSvgIcons.set(definition.key, newSvg);
    return newSvg;
  }

  private createSvgIconObservable(key: string, fileUrl: string) {
    const obs = this.http.get(fileUrl, { responseType: 'text' }).pipe(
      map(content => this.domStringToSvgElement(content)),
      tap(svgElement => this.svgIconsCache.set(key, svgElement)),
      catchError(err => {
        console.error(err);
        return observableOf(undefined);
      }),
      tap(() => this.fetchingSvgIcons.delete(key)),
      publish()
    ) as ConnectableObservable<SVGSVGElement | undefined>;

    return obs.refCount();
  }

  private domStringToSvgElement(domString: string): SVGSVGElement {
    const div = this.document.createElement('div');
    div.innerHTML = domString;

    const svg = div.querySelector('svg');
    if (!svg) {
      throw new Error('SVG tag not found');
    }

    return svg;
  }
}
