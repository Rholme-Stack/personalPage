import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InstagramService } from '../../services/instagram.service';
import { InstagramComponent } from "../instagram/instagram.component";


@Component({
  selector: 'app-about',
  standalone: true,  
  imports: [CommonModule, TranslateModule, RouterModule, InstagramComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

 
 

  constructor(private instagramService: InstagramService) {}

  

}
