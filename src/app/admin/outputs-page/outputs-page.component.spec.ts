import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputsPageComponent } from './outputs-page.component';

describe('OutputsPageComponent', () => {
  let component: OutputsPageComponent;
  let fixture: ComponentFixture<OutputsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
