import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearParteComponent } from './crear-parte.component';

describe('CrearParteComponent', () => {
  let component: CrearParteComponent;
  let fixture: ComponentFixture<CrearParteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearParteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearParteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
