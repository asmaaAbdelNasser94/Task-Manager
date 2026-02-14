import { Component, inject } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { IconField } from 'primeng/iconfield';
import { InputText, } from 'primeng/inputtext';
import { Avatar } from 'primeng/avatar';
import { InputIcon } from 'primeng/inputicon';
import { LanguageService } from '../../shared/services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'task-manager-header',
  imports: [
    TranslateModule,

    // PrimeNG 
    ToolbarModule,
    IconField,
    InputText,
    Avatar,
    InputIcon
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public langService = inject(LanguageService);

  public toggleLang(): void {
    this.langService.toggleLanguage();
  }
}
