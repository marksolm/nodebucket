/*
============================================
; Title:  base-layout.component.ts
; Author: Soliman Elmalak
; Date:   28 October 2021
; Modified By: Soliman Elmalak
; Description: base-layout.component
============================================
*/

/* Add an import statement  */
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();
  isLoggedIn: boolean; // check if user is logged in
  name: string;

  
  // Define the assignment name
  constructor(private cookieService: CookieService, private router: Router) {
    this.isLoggedIn = this.cookieService.get('session_user') ? true : false;
    console.log('isLoggedIn: ' +  this.isLoggedIn);

  }
  
  ngOnInit(): void {
    console.log('inside the ngOnInit of the base-layout.component.html file');
    this.name = sessionStorage.getItem('name');
    console.log('Logged in user name: ' + this.name);

  }
  //Add a new function named signOut() 
  signOut() {
    //call the cookieService.deleteAll function and then use the Router to navigate users to the sign-in page 
    this.cookieService.deleteAll();
    this.router.navigate(['/session/sign-in']);
  }

}
