import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextLegendComponent } from './text-legend.component';

describe('TextLegendComponent', () => {
  let component: TextLegendComponent;
  let fixture: ComponentFixture<TextLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
