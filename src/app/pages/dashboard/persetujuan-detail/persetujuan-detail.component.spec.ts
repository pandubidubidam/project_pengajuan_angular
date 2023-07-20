import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersetujuanDetailComponent } from './persetujuan-detail.component';

describe('PersetujuanDetailComponent', () => {
  let component: PersetujuanDetailComponent;
  let fixture: ComponentFixture<PersetujuanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersetujuanDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersetujuanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
