/*
=============================================================
; Title:  about.component.ts
; Author: Soliman Elmalak
; Date: 10 November 2021
; Description: about component 
=============================================================
*/

/* Import required modules from Angular */
import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
