import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[appCounter]',
    standalone: false
})
export class CounterDirective {

  occurrencesEffect = 0;

  constructor(
    private el: ElementRef,
  ) { }

  @Input('appCounter') finalNumber: string;

  private counter(num: string) {
    const finalNumber = Number(num);
    let cont = 0;

    if (finalNumber !== 0) {
      const counter = setInterval(() => {
        this.el.nativeElement.textContent = Math.round(cont) + '+';
        cont !== finalNumber ? cont = cont + (finalNumber / 100) : clearInterval(counter);
      }, 10);
    } else {
      const simbolicNumber = 10000;
      const infinity = setInterval(() => {
        this.el.nativeElement.textContent = Math.round(cont) + '+';
        if (cont !== simbolicNumber) {
          cont = cont + (simbolicNumber / 100);
        } else {
          this.el.nativeElement.innerHTML = '&#8734;';
          clearInterval(infinity);
        }
      }, 10);
    }
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    const posScroll = document.documentElement.scrollTop + window.innerHeight;
    const posCounter = this.el.nativeElement.offsetTop;
    // tslint:disable-next-line: max-line-length
    if ((posCounter < posScroll && posCounter + 50 > posScroll || posScroll === document.documentElement.scrollHeight) && this.occurrencesEffect < 1 ) {
      this.counter(this.finalNumber);
      this.occurrencesEffect++;
    }
  }
}
