import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() addEmployee = new EventEmitter<Employee>();
  @Output() close = new EventEmitter<void>();
  constructor(private formsService: FormsService) {}
  employeeForm = this.formsService.createEmployeeModalForm();

  ngOnInit(): void {}
  submit(): void {
    if (this.employeeForm.valid) {
    }
  }
}
