import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadTokenComponent } from './read-token.component';

describe('ReadTokenComponent', () => {
  let component: ReadTokenComponent;
  let fixture: ComponentFixture<ReadTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
