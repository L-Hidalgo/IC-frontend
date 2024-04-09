import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {

  constructor() { }

  // @Input() service: TableService;

  ngOnInit(): void {
  }

  edit (item: any) {
    console.log('ITEM click', item);
  }

  headers:any []= [
    {
      text: 'Dessert (100g serving)',
      align: 'start',
      sortable: false,
      value: 'name',
    },
    { text: 'Fat (g)', value: 'fat' },
    { text: 'Carbs (g)', value: 'carbs' },
    { text: 'Protein (g)', value: 'protein' },
    { text: 'Calories', value: 'calories' },
    { text: 'Iron (%)', value: 'iron' },
  ];

  desserts:any []= [
    {
      name: 'Frozen Yogurt',
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: '1%',
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
      iron: '1%',
    },
    {
      name: 'Eclair',
      calories: 262,
      fat: 16.0,
      carbs: 23,
      protein: 6.0,
      iron: '7%',
    },
    {
      name: 'Cupcake',
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
      iron: '8%',
    },
    {
      name: 'Gingerbread',
      calories: 356,
      fat: 16.0,
      carbs: 49,
      protein: 3.9,
      iron: '16%',
    },
    {
      name: 'Jelly bean',
      calories: 375,
      fat: 0.0,
      carbs: 94,
      protein: 0.0,
      iron: '0%',
    },
    {
      name: 'Lollipop',
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
      iron: '2%',
    },
    {
      name: 'Honeycomb',
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
      iron: '45%',
    },
    {
      name: 'Donut',
      calories: 452,
      fat: 25.0,
      carbs: 51,
      protein: 4.9,
      iron: '22%',
    },
    {
      name: 'KitKat',
      calories: 518,
      fat: 26.0,
      carbs: 65,
      protein: 7,
      iron: '6%',
    },
  ];


  code = `
<siat-body-card>
  <siat-table [headers]="headers" [items]="desserts" [options]="true" [actionsTemplate]="actionTmpl"></siat-table>
  <ng-template #actionTmpl let-record="record">
      <siat-row fxLayoutGap="0">
          <siat-icon-link icon="fa fa-eye" (onClick)="edit(record)"></siat-icon-link>
          <siat-icon-link icon="fa fa-edit" (onClick)="edit(record)"></siat-icon-link>
          <siat-icon-link icon="fa fa-trash" (onClick)="edit(record)"></siat-icon-link>
      </siat-row>
  </ng-template>
</siat-body-card>`;

}
