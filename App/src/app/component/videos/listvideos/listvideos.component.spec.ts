import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListvideosComponent } from './listvideos.component';

describe('ListvideosComponent', () => {
  let component: ListvideosComponent;
  let fixture: ComponentFixture<ListvideosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListvideosComponent]
    });
    fixture = TestBed.createComponent(ListvideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
