import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, Timestamp, query, orderBy, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Message {
  id?: string;
  name: string;
  email: string;
  message: string;
  status: string;
  timestamp: Timestamp;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {


  
    constructor(private firestore: Firestore) {   }
  
    // Insertar un nuevo mensaje
    addMessage(message: Message) {

      const messagesCollection = collection(this.firestore, 'message');
      return addDoc(messagesCollection, message);
    }
  
    // Listar todos los mensajes
async getMessages(): Promise<Observable<Message[]>> {
  const messagesCollection = collection(this.firestore, 'message');
  return new Promise((resolve, reject) => {
    getDocs(query(messagesCollection, orderBy('timestamp', 'desc')))
      .then((querySnapshot) => {
        const messages: Message[] = [];
        querySnapshot.forEach((doc) => {
          messages.push({
            id: doc.id,
            ...doc.data()
          } as Message);
        });
        resolve(new Observable((observer) => {
          observer.next(messages);
          observer.complete();
        }));
      })
      .catch((error) => reject(error));
  });
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
