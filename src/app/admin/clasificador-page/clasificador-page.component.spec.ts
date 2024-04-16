import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificadorPageComponent } from './clasificador-page.component';

describe('ClasificadorPageComponent', () => {
  let component: ClasificadorPageComponent;
  let fixture: ComponentFixture<ClasificadorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasificadorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasificadorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
