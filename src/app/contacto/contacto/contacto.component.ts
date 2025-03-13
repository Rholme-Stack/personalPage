import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MessageComponent } from '../../modal/message/message.component';
import { MessageService } from '../../services/message.service'; // Asegúrate de importar el servicio correcto
import { Timestamp } from '@angular/fire/firestore';


@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, MessageComponent],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  contactForm: FormGroup;

  @ViewChild('modalConfirmacion') modalConfirmacion!: MessageComponent;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(400)]]
    });
  }

  async submitForm() { 
    if (this.contactForm.valid) {
      const now = Timestamp.now(); // Fecha actual en formato Firestore Timestamp
      const formData = this.contactForm.value;

      const message = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        status: 'new',
        timestamp: now
      };

      try {
        await this.messageService.addMessage(message);         
        this.modalConfirmacion.abrirModal(); //modal de confirmación
        this.contactForm.reset(); // Limpiar el formulario después de enviarlo
      } catch (error) {
        console.error('Error on saving message:', error);
      }
    }
  }
}
