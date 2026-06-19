import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carrussel } from './carrussel';

describe('Carrussel', () => {
  let component: Carrussel;
  let fixture: ComponentFixture<Carrussel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carrussel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carrussel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
