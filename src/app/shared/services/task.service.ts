/*
=============================================================
; Title:  task.service.ts
; Author: Soliman Elmalak
; Date: 02 November 2021
; Description: task.service.ts
=============================================================
*/

/* Import required modules from Angular */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  /* findAllTasks */
 findAllTasks(empId: number): Observable<any> {
   return this.http.get('api/employees/' + empId + '/tasks')
 }

  /* createTask */
 createTask(empId: number, task: string): Observable<any> {
   return this.http.post('/api/employees/' + empId + '/tasks', {
     text: task
   })
 }

  /*updateTask */
  updateTask(empId: number, todo: Item[], done: Item[]): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      todo,
      done,
    });
  }
   
     /* deleteTask */
    deleteTask(empId: number, taskId: string): Observable<any> {
      return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId)
    }

}
