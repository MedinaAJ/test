import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorizarComponent } from './monitorizar.component';

describe('MonitorizarComponent', () => {
  let component: MonitorizarComponent;
  let fixture: ComponentFixture<MonitorizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
