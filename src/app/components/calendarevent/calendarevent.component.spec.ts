import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendareventComponent } from './calendarevent.component';

describe('CalendareventComponent', () => {
  let component: CalendareventComponent;
  let fixture: ComponentFixture<CalendareventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendareventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendareventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
