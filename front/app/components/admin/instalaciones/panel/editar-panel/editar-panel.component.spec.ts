import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPanelComponent } from './editar-panel.component';

describe('EditarPanelComponent', () => {
  let component: EditarPanelComponent;
  let fixture: ComponentFixture<EditarPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
