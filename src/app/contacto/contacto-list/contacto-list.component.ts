import { Component, OnInit, NgZone } from '@angular/core';
import { Message, MessageService } from '../../services/message.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-contacto-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './contacto-list.component.html',
  styleUrls: ['./contacto-list.component.css']
})
export class ContactoListComponent implements OnInit {
  messages!: Message[];
  swipeStatus: boolean[] = []; // Usamos un array para gestionar el estado de "swiped"
  isLoading: boolean = false; // Variable de estado para el spinner

  private touchStartX: number = 0;
  private touchEndX: number = 0;

  constructor(private messageService: MessageService) {}

  async ngOnInit() {
    // Mostrar el spinner al cargar los mensajes
    this.isLoading = true;
    await this.loadMessages();
    this.isLoading = false; // Ocultar el spinner después de cargar los mensajes
  }

  // Función para cargar los mensajes
  async loadMessages() {
    try {
      // Llamada para obtener los mensajes
      (await this.messageService.getMessages()).subscribe((data) => {
        console.log(data);
        this.messages = data;
        // Inicializa el array de swipeStatus con 'false' para cada mensaje
        this.swipeStatus = new Array(this.messages.length).fill(false);
      });
    } catch (error) {
      console.error('Error al cargar los mensajes', error);
    }
  }

  updateStatus(id: string) {
    this.messageService.updateMessageStatus(id, 'read');

    // Cargar nuevamente los mensajes y desactivar el spinner después de un retraso
    setTimeout(() => {
      this.loadMessages().then(() => {
        this.isLoading = false; // Ocultar el spinner después de cargar los mensajes
      });
    }, 1000);
  }

  // Manejar la eliminación de un mensaje
  async deleteMessage(id: string, index: number) {
    // Primero, mostrar el spinner mientras se procesa la eliminación
    this.isLoading = true;

    // Primero, marcar la tarjeta como deslizada
    this.swipeStatus[index] = true;

    // Llamamos al servicio para eliminar el mensaje en el servidor
    this.messageService.deleteMessage(id);

    // Esperamos un tiempo para la animación antes de eliminarlo localmente
    setTimeout(() => {
      // Eliminar el mensaje localmente de la lista de mensajes
      this.messages.splice(index, 1);

      // Cargar nuevamente los mensajes y desactivar el spinner después de un retraso
      this.loadMessages().then(() => {
        this.isLoading = false; // Ocultar el spinner después de cargar los mensajes
      });
    }, 1000); // Se espera un tiempo para la animación de deslizamiento (1 segundo)
  }

  // Manejar el evento touchstart
  onTouchStart(event: TouchEvent, index: number): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  // Manejar el evento touchend
  onTouchEnd(event: TouchEvent, index: number): void {
    this.touchEndX = event.changedTouches[0].screenX;

    // Detectar si el deslizamiento fue hacia la izquierda (más de 50px)
    if (this.touchStartX - this.touchEndX > 50) {
      // Marcar el mensaje como deslizado
      this.swipeStatus[index] = true;

      // Llamar a la función de eliminación después de un breve retraso para que se vea la animación
      this.deleteMessage(this.messages[index].id!, index);
    }
  }
}
