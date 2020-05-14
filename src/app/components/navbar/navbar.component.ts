import { Router } from '@angular/router';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  userLoggedIn: string;

  constructor(private authService: AuthClientService, private flashMessages: FlashMessagesService, private route: Router) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth =>{
      if(auth){
        this.isLoggedIn = true;
        this.userLoggedIn = auth.email;
      }else {
        this.isLoggedIn = false;
      }
    })
  }

  onLogOut(){
    this.authService.logOut();
    this.route.navigate(['/login']);
    this.isLoggedIn = false;
  }

}
