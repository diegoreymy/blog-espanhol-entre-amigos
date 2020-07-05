import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SwUpdate, ServiceWorkerModule } from '@angular/service-worker';

const mockSwUpdateInstance = new SwUpdate({isEnabled: false} as any);

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ServiceWorkerModule.register('', {enabled: false}),
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent
      ],
      providers: [{provide: SwUpdate, useValue: mockSwUpdateInstance}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should ngAfterViewInit fuction', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngAfterViewInit();
    expect(app).toBeTruthy();
  });

  it('should updatePWA fuction', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.updatePWA();
    expect(app).toBeTruthy();
  });

  it('should setTitle fuction', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.setTitle('https://espanholentreamigos.com.br/blog/10-consejos-para-aprender-espanol-rapido-y-divertido');
    expect(app).toBeTruthy();
  });

  it('should setAnalytics fuction', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.setAnalytics();
    expect(app).toBeTruthy();
  });

});
