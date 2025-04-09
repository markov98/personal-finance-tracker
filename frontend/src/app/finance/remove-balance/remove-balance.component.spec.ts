import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveBalanceComponent } from './remove-balance.component';

describe('RemoveBalanceComponent', () => {
  let component: RemoveBalanceComponent;
  let fixture: ComponentFixture<RemoveBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveBalanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
