import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisualizarPlantillaComponent } from './previsualizar-plantilla.component';

describe('PrevisualizarPlantillaComponent', () => {
  let component: PrevisualizarPlantillaComponent;
  let fixture: ComponentFixture<PrevisualizarPlantillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevisualizarPlantillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevisualizarPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
