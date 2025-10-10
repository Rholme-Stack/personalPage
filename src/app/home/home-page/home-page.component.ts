import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InstagramService } from '../../services/instagram.service';
import { InstagramPost } from '../../interfaces/instagram-post.interface';
import { AnimatedImage } from '../../interfaces/animated-image.interface';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private instagramService: InstagramService,
              private translate: TranslateService) {
      const savedLang = localStorage.getItem('lang') || 'en';
      this.translate.setDefaultLang(savedLang);
      this.translate.use(savedLang);
    }

    public posts: InstagramPost[] = [];
    public animatedImages: AnimatedImage[] = []; 
    
    // 💡 Propiedades para la secuencia de inicio
    private allCalculatedImages: AnimatedImage[] = []; 
    private animationInterval: any; 
  
    
  
    ngOnInit(): void {
      this.instagramService.getInstagramPosts().subscribe(
        (data: InstagramPost[]) => {
          // Asigna el array real de posts (ajusta si tu servicio devuelve un objeto, ej: data.data)
          this.posts = (data as any).data || data; 
          
          // 1. Calcular todas las propiedades (incluyendo la velocidad aleatoria)
          this.allCalculatedImages = this.calculateAllImageProperties(); 
          
          // 2. Iniciar la secuencia de liberación lenta
          this.startAnimationSequence(); 
        },
        (error) => {
          console.error('Error al cargar los posts de Instagram:', error);
        }
      );
    }
  
    // 1. Método que calcula todas las propiedades aleatorias de las imágenes.
    calculateAllImageProperties(): AnimatedImage[] {
      if (!this.posts || this.posts.length === 0) {
        return [];
      }
      
      return this.posts
        .filter(p => p.media_type === 'IMAGE' || p.media_type === 'CAROUSEL_ALBUM')
        .map(post => ({
          src: post.media_url, 
          top: this.getRandomNumber(0, 80), 
          left: this.getRandomNumber(100, 150),
          rotation: this.getRandomNumber(-15, 15),
          // Mantiene la duración/velocidad aleatoria que ya calculaste
          duration: this.getRandomNumber(30, 60) 
        }));
    }
  
    // 2. Método clave: Suelta una imagen cada segundo.
    startAnimationSequence(): void {
        let index = 0;
        const imagesToAnimate = this.allCalculatedImages.length;
        const delayMs = 1000; // 💡 Intervalo de 1 segundo entre cada aparición
        
        this.animationInterval = setInterval(() => {
            if (index < imagesToAnimate) {
                // Añade la imagen al array visible. Su animación CSS comienza inmediatamente.
                this.animatedImages.push(this.allCalculatedImages[index]);
                index++;
            } else {
                // Detener el temporizador cuando todas las imágenes están en pantalla.
                clearInterval(this.animationInterval);
            }
        }, delayMs);
    }
  
    // Limpieza: Detener el temporizador cuando el componente se destruye.
    ngOnDestroy(): void {
      if (this.animationInterval) {
        clearInterval(this.animationInterval);
      }
    }
  
    private getRandomNumber(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}
