import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from './../../models/client';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: null,
    balance: 0
  };

  constructor(private clientService: ClientService,
              private route: ActivatedRoute,
              private flashMessages: FlashMessagesService,
              private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client =>{
    this.client = client;
    console.log(client)
   })
  }

  onSubmit(){
    this.client.id = this.id;
    this.clientService.updateClient(this.client)

    this.flashMessages.show('Client updated', {cssClass : 'alert-success', timeout: 4000});
    this.router.navigate(['/client/'+ this.id]);
  }

}
