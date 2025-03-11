import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UnderConstructionComponent } from "../../under-construction/under-construction.component";

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [TranslateModule, UnderConstructionComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {


}
