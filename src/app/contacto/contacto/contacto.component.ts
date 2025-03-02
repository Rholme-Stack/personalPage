import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { TranslateModule } from '@ngx-translate/core';
import { MessageComponent } from '../../modal/message/message.component';


@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, MessageComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  contactForm: FormGroup;

  @ViewChild('modalConfirmacion') modalConfirmacion!: MessageComponent;

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(400)]]
    });
  }

  async submitForm() { 
    if (this.contactForm.invalid) return; // Evitar envío si el formulario es inválido
    
    try {
      const messagesRef = collection(this.firestore, 'messages'); // Referencia a la colección de Firestore
      await addDoc(messagesRef, {
        ...this.contactForm.value,  // Datos del formulario
        timestamp: new Date()       // Agregar fecha y hora actual
      });
      
      //modal 
      this.modalConfirmacion.abrirModal();

      this.contactForm.reset();
    } catch (error) {
      console.error('Error al enviar mensaje: ', error);
    }
  }
}
