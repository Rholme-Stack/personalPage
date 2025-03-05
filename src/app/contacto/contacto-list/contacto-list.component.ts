import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from '../../services/message.service';



@Component({
  selector: 'app-contacto-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacto-list.component.html',
  styleUrls: ['./contacto-list.component.css']
})
export class ContactoListComponent implements OnInit {

  
  messages!: Message[];

  constructor(private messageService:MessageService) {}

  async ngOnInit(){
    (await this.messageService.getMessages()).subscribe((data) => {
      console.log(data);
      this.messages = data;
    });
  }
    
  
  updateStatus(arg0: string) {
    this.messageService.updateMessageStatus(arg0, 'read');
  }

  deleteMessage(arg0: string) {
   this.messageService.deleteMessage(arg0);
  }

  
}


