import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable()
export class CreateMarketService {
  normalizeTags(tagString: string): string[] {
    return tagString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
  }

  tagsValidators: ValidatorFn = (formControl: AbstractControl) => {
    const tags = this.normalizeTags(formControl.value as string);

    if (tags.length === 0) {
      return { tags: true };
    }
    return null;
  }
}
