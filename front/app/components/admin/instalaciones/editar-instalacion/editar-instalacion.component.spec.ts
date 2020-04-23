import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInstalacionComponent } from './editar-instalacion.component';

describe('EditarInstalacionComponent', () => {
  let component: EditarInstalacionComponent;
  let fixture: ComponentFixture<EditarInstalacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarInstalacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInstalacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
