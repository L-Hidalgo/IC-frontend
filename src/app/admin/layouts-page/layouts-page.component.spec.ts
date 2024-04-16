import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutsPageComponent } from './layouts-page.component';

describe('LayoutsPageComponent', () => {
  let component: LayoutsPageComponent;
  let fixture: ComponentFixture<LayoutsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
