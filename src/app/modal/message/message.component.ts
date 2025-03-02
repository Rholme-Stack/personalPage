import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements AfterViewInit {

  @Input() titulo: string = 'Confirmación';
  @Input() mensaje: string = 'Operación realizada con éxito.';
  @Input() modalId: string = 'modalConfirmacion';

  private modalInstance: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const modalElement = document.getElementById(this.modalId);
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.cdr.detectChanges(); // Forzar detección de cambios
    }
  }

  abrirModal() {
    if (this.modalInstance) {
      this.modalInstance.show();
    } else {
      console.error('No se encontró el modal con el ID:', this.modalId);
    }
  }
}