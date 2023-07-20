import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LacakPengajuanDetailComponent } from './lacak-pengajuan-detail.component';

describe('LacakPengajuanComponent', () => {
  let component: LacakPengajuanDetailComponent;
  let fixture: ComponentFixture<LacakPengajuanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LacakPengajuanDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LacakPengajuanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
