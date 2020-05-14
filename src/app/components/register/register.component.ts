import { Router } from '@angular/router';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  constructor(private authClient: AuthClientService, private route: Router, private flashMessages: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegister(){
    this.authClient.register(this.email, this.password)
    .then(register =>{
        this.flashMessages.show('Congratulation you are logged !', {cssClass: 'alert-success', timeout: 4000})
        this.route.navigate(['/']);
    })
    .catch(error =>{
      this.flashMessages.show(error.message, {cssClass: 'alert-danger', timeout: 4000})

    })
  }

}
