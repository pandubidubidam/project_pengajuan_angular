import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengajuanBttComponent } from './pengajuan-btt.component';

describe('PengajuanBttComponent', () => {
  let component: PengajuanBttComponent;
  let fixture: ComponentFixture<PengajuanBttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PengajuanBttComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PengajuanBttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
