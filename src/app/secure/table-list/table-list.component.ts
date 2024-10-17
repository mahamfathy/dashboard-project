import { Component, OnInit } from '@angular/core';
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
  employees: any[] = [];
  constructor(private tableService: TableListService) {}
  ngOnInit() {
    this.tableService.getList().subscribe((data) => {
      // console.log('Full response:', data);
      if (Array.isArray(data)) {
        this.employees = data;
      }
    });
  }
}
