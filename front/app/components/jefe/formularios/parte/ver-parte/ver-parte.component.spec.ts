import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerParteComponent } from './ver-parte.component';

describe('VerParteComponent', () => {
  let component: VerParteComponent;
  let fixture: ComponentFixture<VerParteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerParteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerParteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
