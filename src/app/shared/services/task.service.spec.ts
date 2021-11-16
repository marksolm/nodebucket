/*
============================================
; Title:  task.service.spec.ts
; Author: Soliman Elmalak
; Date:   02 november 2021
; Description: task.service.spec.ts
============================================
*/

/* Import required statements */
import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
