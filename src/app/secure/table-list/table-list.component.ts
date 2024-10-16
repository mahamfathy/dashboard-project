import { Component, OnInit } from '@angular/core';
import { TableListService } from '../../shared/services/table-list.service';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [],
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit {
  employees: any[] = [];
  constructor(private tableService: TableListService) {}
  ngOnInit() {
    this.tableService.getList().subscribe(
      (data) => {
        console.log(data);
        this.employees = Object.values(data.employees);
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
}
