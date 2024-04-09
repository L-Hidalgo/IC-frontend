import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  optionclock: any;

  gaugeData: any = [
    {
      value: 75,
      name: 'General',
      title: {
        offsetCenter: ['-25%', '80%']
      },
      detail: {
        offsetCenter: ['-25%', '95%']
      }
    },
    {
      value: 45,
      name: 'Etapa',
      title: {
        offsetCenter: ['25%', '80%']
      },
      detail: {
        offsetCenter: ['25%', '95%']
      }
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.loadClock();
  }

  loadClock() {
    this.optionclock = {
      series: [
        {
          type: 'gauge',
          anchor: {
            show: true,
            showAbove: true,
            size: 18,
            itemStyle: {
              color: '#FAC858'
            }
          },
          pointer: {
            icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
            width: 8,
            length: '80%',
            offsetCenter: [0, '8%']
          },
          progress: {
            show: true,
            overlap: true,
            roundCap: true
          },
          axisLine: {
            roundCap: true
          },
          data: this.gaugeData,
          title: {
            fontSize: 14
          },
          detail: {
            width: 40,
            height: 14,
            fontSize: 14,
            color: '#fff',
            backgroundColor: 'auto',
            borderRadius: 3,
            formatter: '{value}%'
          }
        }
      ]
    };
  }


}
