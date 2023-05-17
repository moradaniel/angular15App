import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoModalServiceStaticComponentComponent } from './demo-modal-service-static-component.component';

describe('DemoModalServiceStaticComponentComponent', () => {
  let component: DemoModalServiceStaticComponentComponent;
  let fixture: ComponentFixture<DemoModalServiceStaticComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoModalServiceStaticComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoModalServiceStaticComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
