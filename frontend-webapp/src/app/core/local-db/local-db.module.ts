import { NgModule } from '@angular/core';

import { KeyValueStore, STORAGE_KEY_PREFIX, STORAGE_OBJ } from './key-value-store.service';

@NgModule({
  providers: [
    KeyValueStore,
    { provide: STORAGE_OBJ, useValue: localStorage },
    { provide: STORAGE_KEY_PREFIX, useValue: 'wm_' }
  ]
})
export class LocalDbModule { }
