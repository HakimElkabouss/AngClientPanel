import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthClientService, private flashMessages: FlashMessagesService, private route: Router) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth =>{
      if(auth){
        this.route.navigate(['/']);
      }
    })
  }

  onLogin(){
    this.authService.login(this.email, this.password)
    .then(auth =>{
      this.flashMessages.show('You are logged successfully !', {cssClass: 'alert-success', timeout: 3000})
      this.route.navigate(['/']);
    })
    .catch(error =>{
      this.flashMessages.show(error.message, {cssClass: 'alert-danger', timeout: 10000})

    })
  }

  onLoginWithGoogle(){
    this.authService.loginWithGoogle()
    .then(auth =>{
      this.flashMessages.show('You are logged successfully !', {cssClass: 'alert-success', timeout: 3000})
      this.route.navigate(['/']);
    })
    .catch(error =>{
      this.flashMessages.show(error.message, {cssClass: 'alert-danger', timeout: 10000})
    })
  }

}
