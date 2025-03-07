import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,  
  imports: [TranslateModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
