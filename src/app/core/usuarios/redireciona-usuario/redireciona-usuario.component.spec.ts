import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirecionaUsuarioComponent } from './redireciona-usuario.component';

describe('RedirecionaUsuarioComponent', () => {
  let component: RedirecionaUsuarioComponent;
  let fixture: ComponentFixture<RedirecionaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirecionaUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirecionaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
