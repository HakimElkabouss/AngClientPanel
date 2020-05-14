import { AuthClientService } from './../../services/auth-client.service';
import { ClientService } from './../../services/client.service';
import { Client } from './../../models/client';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
      firstName: "",
      lastName: "",
      email: "",
      phone: null,
      balance: 0,
      user: ''
  }
  constructor(private clientService: ClientService,
              private router: Router,
              private flashMessages: FlashMessagesService,
              private authClientService: AuthClientService) { }

  ngOnInit() {
    this.authClientService.getAuth().subscribe(auth =>{
    this.client.user = auth.uid
    })
  }

  onSubmit(){
    this.clientService.newClient(this.client);
    this.flashMessages.show('Client added successfully', {cssClass: 'alert-primary', timeout: 5000})
    this.router.navigate(['/']);
  }

}
