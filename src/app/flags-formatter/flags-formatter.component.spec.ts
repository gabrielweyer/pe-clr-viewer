import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagsFormatterComponent } from './flags-formatter.component';

describe('FlagsFormatterComponent', () => {
  let fixture: ComponentFixture<FlagsFormatterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [FlagsFormatterComponent] });
    fixture = TestBed.createComponent(FlagsFormatterComponent);
  });

  describe('Given flags not set on component', () => {
    it ('Then flags are not rendered', () => {
      fixture.detectChanges();
      const flagsElement: HTMLElement = fixture.nativeElement;
      const span = flagsElement.querySelector('span');
      expect(span).toBeNull();
    });
  });

  describe('Given single flag set on component', () => {
    it ('Then no trailing comma', () => {
      fixture.componentRef.setInput('flags', ['only-one']);
      fixture.detectChanges();
      const flagsElement: HTMLElement = fixture.nativeElement;
      expect(flagsElement.textContent).toBe('only-one');
    });

    it ('Then flag uses mono font', () => {
      fixture.componentRef.setInput('flags', ['set-css-class']);
      fixture.detectChanges();
      const flagsElement: HTMLElement = fixture.nativeElement;
      const span = flagsElement.querySelector('span');
      expect(span).not.toBeNull();
      expect(span?.className).toContain('mono-font');
    });
  });

  describe('Given two flags set on component', () => {
    it ('Then renders flags separated by a comma', () => {
      fixture.componentRef.setInput('flags', ['only-one', 'only-two']);
      fixture.detectChanges();
      const flagsElement: HTMLElement = fixture.nativeElement;
      expect(flagsElement.textContent).toBe('only-one, only-two');
    });
  });
});
