/*
============================================
; Title:  create-task-dialog.component.ts
; Author: Soliman Elmalak
; Date:   27 October 2021
; Description: create-task-dialog.component of nodebucket
============================================
*/

/* Import required modules from Angular */
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {

  taskForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<CreateTaskDialogComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    })
  }
  // create a new task
  createTask() {
    this.dialogRef.close(this.taskForm.value);
  }
   // cancel and close the dialog form
  cancel() {
    this.dialogRef.close();
  }

}
