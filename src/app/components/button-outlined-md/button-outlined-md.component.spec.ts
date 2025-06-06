import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonOutlinedMdComponent } from './button-outlined-md.component';

describe('ButtonOutlinedMdComponent', () => {
  let component: ButtonOutlinedMdComponent;
  let fixture: ComponentFixture<ButtonOutlinedMdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonOutlinedMdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonOutlinedMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
