/*
============================================
; Title:  employee.interface.ts
; Author: Soliman Elmalak
; Date:   02 november 2021
; Description: Interface to define an Item
============================================
*/

// Import the Item Interface 
import { Item } from './item.interface';

export interface Employee {
  empId: string;
  todo: Item[];
  done: Item[];
}