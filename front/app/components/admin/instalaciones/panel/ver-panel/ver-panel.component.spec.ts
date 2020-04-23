import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPanelComponent } from './ver-panel.component';

describe('VerPanelComponent', () => {
  let component: VerPanelComponent;
  let fixture: ComponentFixture<VerPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
