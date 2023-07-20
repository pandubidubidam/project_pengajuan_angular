import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengajuanBuComponent } from './pengajuan-bu.component';

describe('PengajuanBuComponent', () => {
  let component: PengajuanBuComponent;
  let fixture: ComponentFixture<PengajuanBuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PengajuanBuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PengajuanBuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
