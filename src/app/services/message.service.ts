import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Message {
  id?: string;
  name: string;
  email: string;
  message: string;
  status: string;
  fecha: Timestamp;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

   private messagesCollection;
  
    constructor(private firestore: Firestore) {
      this.messagesCollection = collection(this.firestore, 'message');
    }
  
    // Insertar un nuevo mensaje
    addMessage(message: Message) {
      return addDoc(this.messagesCollection, message);
    }
  
    // Listar todos los mensajes
    getMessages(): Observable<Message[]> {
      return collectionData(this.messagesCollection, { idField: 'id' }) as Observable<Message[]>;
    }
  
    // Eliminar un mensaje por ID
    deleteMessage(id: string) {
      const messageDocRef = doc(this.firestore, `message/${id}`);
      return deleteDoc(messageDocRef);
    }
  
    // Actualizar el estado de un mensaje
    updateMessageStatus(id: string, newStatus: string) {
      const messageDocRef = doc(this.firestore, `message/${id}`);
      return updateDoc(messageDocRef, { status: newStatus });
    }
}
