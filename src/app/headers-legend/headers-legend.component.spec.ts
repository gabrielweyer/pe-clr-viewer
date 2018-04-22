import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadersLegendComponent } from './headers-legend.component';

describe('HeadersLegendComponent', () => {
  let component: HeadersLegendComponent;
  let fixture: ComponentFixture<HeadersLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadersLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadersLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
