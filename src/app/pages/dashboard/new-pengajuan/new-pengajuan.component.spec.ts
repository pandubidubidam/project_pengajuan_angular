import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPengajuanComponent } from './new-pengajuan.component';

describe('NewPengajuanComponent', () => {
  let component: NewPengajuanComponent;
  let fixture: ComponentFixture<NewPengajuanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPengajuanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPengajuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
