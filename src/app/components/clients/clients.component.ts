import { AuthClientService } from 'src/app/services/auth-client.service';
import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  searchClients: Client[];
  total: number = 0;



  constructor(private clientService: ClientService, private flashMessages: FlashMessagesService, private router: Router, private authClientService: AuthClientService) { }

  ngOnInit() {
    this.authClientService.getAuth().subscribe(auth =>{
      this.clientService.getClients(auth.uid).subscribe(clients =>{
      this.searchClients = this.clients = clients;
      this.total = this.getTotal();
    })
    })

  }

  search(query: string){
    this.searchClients = (query) ? this.clients.filter(client => client.firstName.toLowerCase().includes(query.toLowerCase()) || client.lastName.toLowerCase().includes(query.toLowerCase()) || client.email.toLowerCase().includes(query.toLowerCase())) : this.clients;
  }

  getTotal(){
    return this.clients.reduce((total, client) =>{
      return total + parseFloat(client.balance.toString());
    }, 0)
  }

  deleteClient(id: string){

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.clientService.deleteClient(id);
        this.router.navigate(['/']);
        this.flashMessages.show('Client is deleted', {cssClass: 'alert-danger', timeout: 4000})
        Swal.fire({
          title: 'deleted',
          text: 'This client is deleted',
          icon: 'success',
          timer: 2500
        })
      }
    })



  }

}
