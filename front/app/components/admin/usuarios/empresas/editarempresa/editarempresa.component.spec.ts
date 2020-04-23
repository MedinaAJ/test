import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarempresaComponent } from './editarempresa.component';

describe('EditarempresaComponent', () => {
  let component: EditarempresaComponent;
  let fixture: ComponentFixture<EditarempresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarempresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
