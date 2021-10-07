import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendentsComponent } from './attendents.component';

describe('AttendentsComponent', () => {
  let component: AttendentsComponent;
  let fixture: ComponentFixture<AttendentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
