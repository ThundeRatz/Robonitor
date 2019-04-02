import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategiesPage } from './strategies.page';

describe('StrategiesPage', () => {
  let component: StrategiesPage;
  let fixture: ComponentFixture<StrategiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrategiesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
