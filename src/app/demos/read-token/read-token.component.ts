import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/restSerice.service';

@Component({
  selector: 'app-read-token',
  templateUrl: './read-token.component.html',
  styleUrls: ['./read-token.component.scss']
})
export class ReadTokenComponent implements OnInit {

  selected: string = '';
  lista: any [] = [];
  constructor(private restService:RestService) { }

  ngOnInit(): void {
    this.restService.dataModel$.subscribe( data => this.selected= data);
  }

  getService () {
    this.selected = '';
    this.restService.getConnection();
  }


}
