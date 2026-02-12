import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type AppLanguage = 'en' | 'ar';

const LANGUAGE_KEY = 'app_language';
const RTL_LANGUAGES: AppLanguage[] = ['ar'];

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);
  private document = inject(DOCUMENT);

  /** Initialize language from localStorage or default to 'en' */
  public initLanguage(): void {
    const savedLang = this.getSavedLanguage();
    this.setLanguage(savedLang);
  }

  get currentLang(): AppLanguage {
    return (this.translate.getCurrentLang() as AppLanguage) || 'en';
  }

  /** Switch to a new language and persist the choice */
  public setLanguage(lang: AppLanguage): void {
    this.translate.use(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
    this.updateDocumentDirection(lang);
    this.updateDocumentLang(lang);
  }

  /** Toggle between English and Arabic */
  public toggleLanguage(): void {
    const newLang: AppLanguage = this.currentLang === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }

  /** Check if the current language is RTL */
  get isRtl(): boolean {
    return RTL_LANGUAGES.includes(this.currentLang);
  }

  private getSavedLanguage(): AppLanguage {
    const saved = localStorage.getItem(LANGUAGE_KEY) as AppLanguage | null;
    return saved && ['en', 'ar'].includes(saved) ? saved : 'en';
  }

  private updateDocumentDirection(lang: AppLanguage): void {
    const dir = RTL_LANGUAGES.includes(lang) ? 'rtl' : 'ltr';
    this.document.documentElement.setAttribute('dir', dir);
  }

  private updateDocumentLang(lang: AppLanguage): void {
    this.document.documentElement.setAttribute('lang', lang);
  }
}
