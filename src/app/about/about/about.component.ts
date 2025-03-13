import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { InstagramComponent } from "../instagram/instagram.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-about',
  standalone: true,  
  imports: [CommonModule, TranslateModule, RouterModule, InstagramComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
[x: string]: string;

}
