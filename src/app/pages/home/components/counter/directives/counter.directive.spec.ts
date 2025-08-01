import { CounterDirective } from './counter.directive';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: '<p appCounter="2500">2500+</p>',
    standalone: false
})
class TestComponent { }

describe('CounterDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let debugElement: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CounterDirective, TestComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    element = debugElement.nativeElement;
  });

  it('should apply style of click', async(() => {
    fixture.detectChanges();
    const directive = debugElement.query(By.directive(CounterDirective));
    expect(directive).toBeTruthy();
  }));
});
