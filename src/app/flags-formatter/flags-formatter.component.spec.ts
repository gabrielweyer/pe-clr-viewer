import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FlagsFormatterComponent } from './flags-formatter.component';

describe('FlagsFormatterComponent', () => {
  let component: FlagsFormatterComponent;
  let fixture: ComponentFixture<FlagsFormatterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagsFormatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagsFormatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
