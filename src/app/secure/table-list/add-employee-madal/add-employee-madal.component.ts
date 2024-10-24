import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../../../shared/models/employee';
import { FormsService } from '../../../shared/services/forms.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-add-employee-madal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-employee-madal.component.html',
  styleUrl: './add-employee-madal.component.scss',
})
export class AddEmployeeMadalComponent implements OnInit {
  @Input() employee?: Employee;
  @Output() addEmployee = new EventEmitter<Employee>();
  @Output() updateEmployee = new EventEmitter<Employee>();
  @Output() close = new EventEmitter<void>();
  constructor(private formsService: FormsService) {}
  employeeForm = this.formsService.createEmployeeModalForm();

  ngOnInit(): void {
    if (this.employee) {
      this.employeeForm.patchValue(this.employee);
    }
  }

  submit(): void {
    if (this.employeeForm.valid) {
      if (this.employee && this.employee.scrambledId) {
        this.updateEmployee.emit(this.employeeForm.value);
      } else {
        this.addEmployee.emit(this.employeeForm.value);
      }
      this.close.emit();
    }
  }
}
