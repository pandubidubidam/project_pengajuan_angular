import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengajuanTuComponent } from './pengajuan-tu.component';

describe('PengajuanTuComponent', () => {
  let component: PengajuanTuComponent;
  let fixture: ComponentFixture<PengajuanTuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PengajuanTuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PengajuanTuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
