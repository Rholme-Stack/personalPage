import { Component, OnInit } from '@angular/core';
import { InstagramService } from '../../services/instagram.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instagram',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instagram.component.html',
  styleUrl: './instagram.component.css'
})
export class InstagramComponent implements OnInit {
  posts: any[] = [];

  constructor(private instagramService: InstagramService) {}

  ngOnInit(): void {
    this.instagramService.getInstagramPosts().subscribe((data) => {
      this.posts = data.data; // Accedemos a la lista de publicaciones
    });
  }

}
