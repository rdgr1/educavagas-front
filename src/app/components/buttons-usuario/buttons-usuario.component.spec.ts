import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsUsuarioComponent } from './buttons-usuario.component';

describe('ButtonsUsuarioComponent', () => {
  let component: ButtonsUsuarioComponent;
  let fixture: ComponentFixture<ButtonsUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonsUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
