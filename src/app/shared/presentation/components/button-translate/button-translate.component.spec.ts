import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTranslateComponent } from './button-translate.component';

describe('ButtonTranslateComponent', () => {
  let component: ButtonTranslateComponent;
  let fixture: ComponentFixture<ButtonTranslateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonTranslateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
