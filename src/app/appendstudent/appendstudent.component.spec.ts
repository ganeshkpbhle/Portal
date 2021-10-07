import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppendstudentComponent } from './appendstudent.component';

describe('AppendstudentComponent', () => {
  let component: AppendstudentComponent;
  let fixture: ComponentFixture<AppendstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppendstudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppendstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
