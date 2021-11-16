/*
=============================================================
; Title:  home.component.ts
; Author: Soliman Elmalak
; Date: 02 November 2021
; Description: home component
=============================================================
*/

/* Import required modules from Angular */
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/models/employee.interface';
import { CookieService } from 'ngx-cookie-service';
import { Item } from '../../shared/models/item.interface';
import { TaskService } from '../../shared/services/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './../../shared/create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // find the tasks
  employee: Employee;
  todo: Item[];
  done: Item[];
  empId:  number;

  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {
    // Find all tasks for a specific empId, subscribe to them, and declare them
    this.empId = parseInt(this.cookieService.get('session_user'), 10);

    this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log("--Server response from findAllTask--");
      console.log(res);

      this.employee = res;
      console.log("--Employee object--");
      console.log(this.employee);
    }, err => {
      console.log("--Server error--");
      console.log(err);

    }, () => {
      console.log('--onComplete of the findAllTasks service call--');
      // Perform when everything else is complete
      this.todo = this.employee.todo;
      this.done = this.employee.done;

      console.log("--To do tasks--");
      console.log(this.todo);
      console.log("--Done tasks--");
      console.log(this.done);
    })
  }
    
  ngOnInit(): void {}
  // Create a new task
  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      height: '250px',
      width: "500px",
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res;
        }, err => {
          console.log("--Server error--");
          console.log(err);
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
    })
 
  }

  // Drag and Drop logic to move and rearrange the tasks
  drop(event: CdkDragDrop<any[]>) {
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      console.log("Reordered the existing list of task items");
      this.updateTaskList(this.empId, this.todo, this.done);

    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      console.log("Task items moved to the other container")

      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }
  
   // update the task list
  private updateTaskList(empId: number, todo: Item[], done: Item[]): void {
    this.taskService.updateTask(this.empId, this.todo, this.done).subscribe((res) => {
      this.employee = res.data;
    }, err => {
      console.log(err)
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
    })
  }

  // Delete tasks chosen for deletion
  deleteTask(taskId: string): void {
    // confirm the user wants to delete the task
    if (confirm('Are you sure you want to delete this task?')) {

      if (taskId) {
        console.log(`Task item: ${taskId} was deleted`);
  
        this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
          this.employee = res.data;
  
        }, err => {
          console.log(err);
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
  
      }
    }
  }
  
}