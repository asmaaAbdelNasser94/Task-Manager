import { Component, inject, OnInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { LanguageService } from './shared/services/language.service';

@Component({
  selector: 'task-manager-root',
  imports: [TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private _TranslateService = inject(TranslateService);
  private _LanguageService = inject(LanguageService);

  ngOnInit(): void {
    this._TranslateService.addLangs(['en', 'ar']);
    this._LanguageService.initLanguage();
  }
}
