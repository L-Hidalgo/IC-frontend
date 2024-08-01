import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateFormatServiceService {

  constructor() { }
  formatToMySQLDate(date: Date | string): string {
    return moment(date).format('YYYY-MM-DD');
  }
}
