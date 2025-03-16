import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carrusel-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel-info.component.html',
  styleUrl: './carrusel-info.component.css'
})
export class CarruselInfoComponent {

  items = [
    { image: "imagenes/LinkedIn.webp",
      link: "https://es.linkedin.com/in/rodrigo-holme"
     },
    { image: "imagenes/github.webp",
      link: "https://github.com/Rholme-Stack"
     },
    { image: "imagenes/tecno.webp",
      link:"https://dotnet.microsoft.com/es-es/"
     },
    { image: "imagenes/insta.webp", 
      link:"https://www.instagram.com/holme9_/"
     }
  ];

  openLink(link: string) {
    const confirmVisit = confirm("¿Quieres visitar este enlace?");
    if (confirmVisit) {
      window.open(link, "_blank");
    }
  }
  
  

}
