import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeModelComponent } from './make-model.component';

describe('MakeModelComponent', () => {
  let component: MakeModelComponent;
  let fixture: ComponentFixture<MakeModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MakeModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
