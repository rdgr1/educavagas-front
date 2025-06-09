import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUsuarioEscolaComponent } from './dashboard-usuario-escola.component';

describe('DashboardUsuarioEscolaComponent', () => {
  let component: DashboardUsuarioEscolaComponent;
  let fixture: ComponentFixture<DashboardUsuarioEscolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardUsuarioEscolaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardUsuarioEscolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
