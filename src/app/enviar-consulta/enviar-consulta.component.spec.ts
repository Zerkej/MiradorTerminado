import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarConsultaComponent } from './enviar-consulta.component';

describe('EnviarConsultaComponent', () => {
  let component: EnviarConsultaComponent;
  let fixture: ComponentFixture<EnviarConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviarConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
