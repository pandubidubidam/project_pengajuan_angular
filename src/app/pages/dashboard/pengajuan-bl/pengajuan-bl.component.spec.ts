import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengajuanBlComponent } from './pengajuan-bl.component';

describe('PengajuanBlComponent', () => {
  let component: PengajuanBlComponent;
  let fixture: ComponentFixture<PengajuanBlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PengajuanBlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PengajuanBlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
