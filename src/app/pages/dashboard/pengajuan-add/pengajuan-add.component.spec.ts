import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengajuanAddComponent } from './pengajuan-add.component';

describe('PengajuanAddComponent', () => {
  let component: PengajuanAddComponent;
  let fixture: ComponentFixture<PengajuanAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PengajuanAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PengajuanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
