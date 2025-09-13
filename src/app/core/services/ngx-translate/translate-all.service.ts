import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateAllService {

  constructor(private translate: TranslateService, @Inject(PLATFORM_ID) Id: object) {
    translate.setDefaultLang('en');
    if (isPlatformBrowser(Id)) {
      this.changeDirection();
    }
  }

  changeDirection() {
    let saveLanguage = localStorage.getItem('lang') || '';
    this.translate.use(saveLanguage);

    if (saveLanguage == 'en') {
      document.documentElement.dir = 'ltr';
    } else {
      document.documentElement.dir = 'rtl';
    }
  }
}
