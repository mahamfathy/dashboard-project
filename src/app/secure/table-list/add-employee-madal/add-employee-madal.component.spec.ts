import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeMadalComponent } from './add-employee-madal.component';

describe('AddEmployeeMadalComponent', () => {
  let component: AddEmployeeMadalComponent;
  let fixture: ComponentFixture<AddEmployeeMadalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmployeeMadalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEmployeeMadalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
