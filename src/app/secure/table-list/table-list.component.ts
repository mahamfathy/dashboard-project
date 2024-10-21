import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/models/employee';
import { TableListService } from '../../shared/services/table-list.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit {
  employees: Employee[] = [];
  constructor(private tableService: TableListService) {}
  ngOnInit() {
    this.getEmployees();
  }
  private getEmployees(): void {
    this.tableService.getEmployees().subscribe((data) => {
      console.log('Full response:', data);
      this.employees = data;
    });
  }
}
