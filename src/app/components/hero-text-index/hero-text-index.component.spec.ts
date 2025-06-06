import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroTextIndexComponent } from './hero-text-index.component';

describe('HeroTextIndexComponent', () => {
  let component: HeroTextIndexComponent;
  let fixture: ComponentFixture<HeroTextIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroTextIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroTextIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
