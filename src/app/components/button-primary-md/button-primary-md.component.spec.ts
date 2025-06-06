import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPrimaryMdComponent } from './button-primary-md.component';

describe('ButtonPrimaryMdComponent', () => {
  let component: ButtonPrimaryMdComponent;
  let fixture: ComponentFixture<ButtonPrimaryMdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonPrimaryMdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonPrimaryMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
