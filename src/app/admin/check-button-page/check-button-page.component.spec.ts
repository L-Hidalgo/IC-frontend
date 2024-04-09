import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckButtonPageComponent } from './check-button-page.component';

describe('CheckButtonPageComponent', () => {
  let component: CheckButtonPageComponent;
  let fixture: ComponentFixture<CheckButtonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckButtonPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckButtonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
