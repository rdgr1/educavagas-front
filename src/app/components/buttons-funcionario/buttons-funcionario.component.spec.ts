import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsFuncionarioComponent } from './buttons-funcionario.component';

describe('ButtonsFuncionarioComponent', () => {
  let component: ButtonsFuncionarioComponent;
  let fixture: ComponentFixture<ButtonsFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsFuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonsFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
