import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, config } from 'rxjs';
import { data } from '../config/data'
// import * as companyData from "../config/companyData";
// const myData = require('../config/companyData');

@Injectable({
  providedIn: 'root'
})


export class DataService {
  companyData = [
    {
      "companyName": "Google",
      "address": "11, Test Building, Test street, Test",
      "email": "test@gmail.com",
      "phoneNumber": "+1111111111111",
      "empInfo": [
        {
          "empName": "June",
          "designation": "1",
          "joinDate": "01/01/2021",
          "email": "june@gmail.com",
          "phoneNumber": "+1111111111111",
          "skillInfo": [
            {
              "skillName": "Angular",
              "skillRating": "4"
            },
            {
              "skillName": "HTML",
              "skillRating": "5"
            },
            {
              "skillName": "CSS",
              "skillRating": "5"
            },
            {
              "skillName": "JavaScript",
              "skillRating": "5"
            }
          ],
          "eductionInfo": [
            {
              "instituteName": "Test institute",
              "courseName": "BE CSE",
              "completedYear": "Mar 2021"
            },
            {
              "instituteName": "ABC institute",
              "courseName": "BE ECE",
              "completedYear": "Jan 2020"
            }
          ]
        },
        {
          "empName": "July",
          "designation": "1",
          "joinDate": "01/01/2020",
          "email": "june@gmail.com",
          "phoneNumber": "+1111111111111",
          "skillInfo": [
            {
              "skillName": "Java",
              "skillRating": "4"
            },
            {
              "skillName": "SQL",
              "skillRating": "5"
            },
            {
              "skillName": "UI",
              "skillRating": "5"
            },
            {
              "skillName": "JavaScript",
              "skillRating": "5"
            }
          ],
          "eductionInfo": [
            {
              "instituteName": "Test institute",
              "courseName": "BE CSE",
              "completedYear": "Mar 2021"
            },
            {
              "instituteName": "ABC institute",
              "courseName": "BE ECE",
              "completedYear": "Jan 2020"
            }
          ]
        }
      ]
    }
  ]

  constructor(private http: HttpClient, private companyDetails: BehaviorSubject<any>) {
    // this.getJSON().subscribe(data => {
    //     console.log(data);
    // });
}

// public getJSON(): Observable<any> {
//    return this.http.get('../config/companyData');
// }

// getData() {
//   return this.http.get<any>('../../config/companyData.json');
// }

transferData(data: any): Observable<any> {
  return data;
  this.companyDetails.next(data);
}
}
