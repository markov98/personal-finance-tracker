import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the home component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main heading with correct text and class', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1.home-heading');
    expect(h1).toBeTruthy();
    expect(h1?.textContent).toBe('Finance Tracker');
  });

  it('should render an <hr> element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('hr')).toBeTruthy();
  });

  it('should render the subheading with correct text and class', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h2 = compiled.querySelector('h2.home-subheading');
    expect(h2).toBeTruthy();
    expect(h2?.textContent).toBe('For all your financing needs!');
  });
});
