import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AboutComponent } from './about/about/about.component';
import { ContactoComponent } from './contacto/contacto/contacto.component';
import { GamesComponent } from './games/games/games.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomePageComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactoComponent},
    {path: 'games', component: GamesComponent},
    { path: '**', component: NotFoundComponent } 

];
