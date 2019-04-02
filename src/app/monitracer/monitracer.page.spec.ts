import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitracerPage } from './monitracer.page';

describe('MonitracerPage', () => {
  let component: MonitracerPage;
  let fixture: ComponentFixture<MonitracerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitracerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitracerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
