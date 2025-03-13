import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { firebaseConfig, token } from '../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {
  private apiUrl = 'https://graph.instagram.com/me/media';
  private accessToken = token; // Reemplázalo con tu token

  constructor(private http: HttpClient) {}

  getInstagramPosts(): Observable<any> {
    const fields = 'id,caption,media_type,media_url,permalink';
    return this.http.get(`${this.apiUrl}?fields=${fields}&access_token=${this.accessToken}`);
  }
}
