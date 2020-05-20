import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RectanglesComponent } from './rectangles.component';

describe('RectanglesComponent', () => {
  let component: RectanglesComponent;
  let fixture: ComponentFixture<RectanglesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RectanglesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectanglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
