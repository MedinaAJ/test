import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInstalacionComponent } from './crear-instalacion.component';

describe('CrearInstalacionComponent', () => {
  let component: CrearInstalacionComponent;
  let fixture: ComponentFixture<CrearInstalacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearInstalacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearInstalacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
