import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupwidgetComponent } from './popupwidget.component';

describe('PopupwidgetComponent', () => {
  let component: PopupwidgetComponent;
  let fixture: ComponentFixture<PopupwidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupwidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
