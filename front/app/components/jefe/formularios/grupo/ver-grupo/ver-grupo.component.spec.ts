import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerGrupoComponent } from './ver-grupo.component';

describe('VerGrupoComponent', () => {
  let component: VerGrupoComponent;
  let fixture: ComponentFixture<VerGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
