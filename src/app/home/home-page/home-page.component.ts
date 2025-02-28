import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private translate: TranslateService) {
      const savedLang = localStorage.getItem('lang') || 'en';
      this.translate.setDefaultLang(savedLang);
      this.translate.use(savedLang);
    }

}
