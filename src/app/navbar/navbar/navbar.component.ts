import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  currentLanguage = '🇬🇧 English';

  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.translate.setDefaultLang(savedLang);
    this.translate.use(savedLang);
    this.currentLanguage = this.getLanguageName(savedLang);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.currentLanguage = this.getLanguageName(lang);
  }

    // Función para mostrar el nombre correcto del idioma en el botón
  getLanguageName(lang: string): string {
    const languageMap: { [key: string]: string } = {
      es: '🇪🇸 Español',
      en: '🇬🇧 English',
      pt: '🇧🇷 Português'
    };
    return languageMap[lang] || '🌍 Idioma';
  }

  
  openNav() {
    document.getElementById("mySidebar")!.style.width = "100%";
    
  }

  closeNav() {
    document.getElementById("mySidebar")!.style.width = "0";
    
  }

}
