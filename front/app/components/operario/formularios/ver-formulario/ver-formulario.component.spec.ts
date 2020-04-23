import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerFormularioComponent } from './ver-formulario.component';

describe('VerFormularioComponent', () => {
  let component: VerFormularioComponent;
  let fixture: ComponentFixture<VerFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
