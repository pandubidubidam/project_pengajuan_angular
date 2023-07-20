import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LacakPengajuanComponent } from './lacak-pengajuan.component';

describe('LacakPengajuanComponent', () => {
  let component: LacakPengajuanComponent;
  let fixture: ComponentFixture<LacakPengajuanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LacakPengajuanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LacakPengajuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
