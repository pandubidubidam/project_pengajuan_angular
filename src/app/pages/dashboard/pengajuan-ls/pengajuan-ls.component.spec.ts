import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengajuanLsComponent } from './pengajuan-ls.component';

describe('PengajuanLsComponent', () => {
  let component: PengajuanLsComponent;
  let fixture: ComponentFixture<PengajuanLsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PengajuanLsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PengajuanLsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
