import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/models/employee';
import { TableListService } from '../../shared/services/table-list.service';
import { ToastService } from '../../shared/services/toast.service';
import { SharedModule } from '../../shared/shared.module';
import { AddEmployeeMadalComponent } from './add-employee-madal/add-employee-madal.component';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [SharedModule, AddEmployeeMadalComponent],
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit {
  employees: Employee[] = [];
  isAddEmployeeModalOpen = false;

  constructor(
    private tableService: TableListService,
    private toastService: ToastService
  ) {}
  ngOnInit() {
    this.getEmployees();
  }
  private getEmployees(): void {
    this.tableService.getEmployees().subscribe((data) => {
      console.log('Full response:', data);
      this.employees = data;
    });
  }
  openAddEmployeeModal(): void {
    this.isAddEmployeeModalOpen = true;
  }
  closeAddEmployeeModal(): void {
    this.isAddEmployeeModalOpen = false;
  }
  handleAddEmployee(employee: Employee): void {
    this.tableService.addEmployee(employee).subscribe();
    // this.getEmployees();
    this.toastService.showSuccess('Employee added successfully');
  }
}
