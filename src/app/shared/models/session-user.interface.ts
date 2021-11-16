/*
============================================
; Title:  session-user.interface.ts
; Author: Soliman Elmalak
; Date:   04 november 2021
; Description: Interface to define user firstName and lastName when the user signing in
============================================
*/

// Export interface SessionUser 
export interface SessionUser {
    empId: string;
    firstName: string;
    lastName: string;
}