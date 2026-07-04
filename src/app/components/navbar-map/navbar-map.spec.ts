import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMap } from './navbar-map';

describe('NavbarMap', () => {
  let component: NavbarMap;
  let fixture: ComponentFixture<NavbarMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
