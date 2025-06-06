import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonOutlinedComponent } from './button-outlined.component';

describe('ButtonOutlinedComponent', () => {
  let component: ButtonOutlinedComponent;
  let fixture: ComponentFixture<ButtonOutlinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonOutlinedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonOutlinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
