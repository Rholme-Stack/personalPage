import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore } from 'firebase/firestore';
import { collectionData } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore/lite';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  status?: string;
}

@Component({
  selector: 'app-contacto-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacto-list.component.html',
  styleUrls: ['./contacto-list.component.css']
})
export class ContactoListComponent {

  messages$!: Observable<Message[]>;

  constructor(private firestore: Firestore) {}

 
    
  

  getMessages(): Observable<Message[]> {
    throw new Error('Method not implemented.');


  }

  markAsRead(arg0: string) {
    throw new Error('Method not implemented.');
    }
    deleteMessage(arg0: string) {
    throw new Error('Method not implemented.');
    }

  
}


