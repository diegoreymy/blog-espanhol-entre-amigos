import { CounterDirective } from './counter.directive';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ElementRef, Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-test',
  template: '<p [appCounter]="50">50+</p>'
})
export class TestComponent { }

describe('CounterDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let comp: TestComponent;
  let debugElement: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CounterDirective, TestComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    comp = fixture.componentInstance;
    debugElement = fixture.debugElement;
    element = debugElement.nativeElement;
  });

  it('should apply style of click', async(() => {
    fixture.detectChanges();
    const directive = debugElement.query(By.directive(CounterDirective));
    expect(directive).toBeTruthy();
  }));
});
