import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JefeComponent } from './jefe.component';

describe('JefeComponent', () => {
  let component: JefeComponent;
  let fixture: ComponentFixture<JefeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JefeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JefeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
