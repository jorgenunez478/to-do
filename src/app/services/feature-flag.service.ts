import { Injectable } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getValue } from '@angular/fire/remote-config';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FeatureFlagService {
  private showCategoriesSubject = new BehaviorSubject<boolean>(true);
  showCategories$ = this.showCategoriesSubject.asObservable();

  constructor(private remoteConfig: RemoteConfig) {
    this.loadFeatureFlag();
  }

  async loadFeatureFlag() {
    await fetchAndActivate(this.remoteConfig);
    const flag = getValue(this.remoteConfig, 'show_category_feature').asBoolean();
    this.showCategoriesSubject.next(flag);
  }
}