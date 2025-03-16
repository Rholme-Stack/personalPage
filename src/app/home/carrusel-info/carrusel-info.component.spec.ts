import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselInfoComponent } from './carrusel-info.component';

describe('CarruselInfoComponent', () => {
  let component: CarruselInfoComponent;
  let fixture: ComponentFixture<CarruselInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarruselInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarruselInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
