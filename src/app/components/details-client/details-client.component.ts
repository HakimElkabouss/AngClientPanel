import { Client } from './../../models/client';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {

  id: string;
  client: Client;
  showBalance:boolean = false;

  constructor(private clientService: ClientService, private route: ActivatedRoute, private flashMessages: FlashMessagesService, private router: Router) { }

  ngOnInit() {
   this.id = this.route.snapshot.params['id'];
   this.clientService.getClient(this.id).subscribe(client =>{
    this.client = client;
    console.log(client)
   })
  }

  onSubmit(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Balance updated !',
      showConfirmButton: false,
      timer: 1500
    })
    this.client.id = this.id;
    this.clientService.updateClient(this.client);
    this.flashMessages.show('Balance updated', {cssClass : 'alert-warning', timeout: 4000})
    this.showBalance = false;
  }

  deleteClient(id: string){
    if(confirm('Are you sure to delete this client ?')){
      this.clientService.deleteClient(id);
      this.router.navigate(['/']);
      this.flashMessages.show('Client'+' '+this.client.firstName+' '+'is deleted', {cssClass: 'alert-danger', timeout: 4000})
    }
  }

}
