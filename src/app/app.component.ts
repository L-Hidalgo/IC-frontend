import { Component } from '@angular/core';
import { CoreService, OpcionService } from 'core-lib';
import { UseCaseContextService } from './services/usecase-context.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'usecase';

  constructor ( public contextService: UseCaseContextService){

  }

  ngOnInit() {
    this.contextService.obtenerDatos();
  }

  openBottomSheet(): void {
    // this._bottomSheet.open(MensajesComponent);
  }
}
