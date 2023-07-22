import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisiComponent } from './revisi.component';

describe('RevisiComponent', () => {
  let component: RevisiComponent;
  let fixture: ComponentFixture<RevisiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
