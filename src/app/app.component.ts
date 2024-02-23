import { Component, OnInit } from '@angular/core';

import { TableColumn } from '../../projects/cp-primeng-table/src/lib/models/primeng-table.model';
import { DEFAULT_TABLE_SETTINGS } from '../../projects/cp-primeng-table/src/lib/constants/primeng-table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'user-management';

  EXAMPLE_COLUMNS: TableColumn[] = [
    {
      field: 'manufacturerCode',
      headerText: 'Manufacturer name',
      filterable: true,
      sortable: true,
      type: 'text',
    },
    {
      field: 'manufacturerName',
      headerText: 'Manufacturer name',
      filterable: true,
      sortable: true,
      type: 'text',
      checkboxFilterOptions: ['option1', 'option2'],
    },

    {
      field: 'dateCreated',
      headerText: 'Date created',
      sortable: true,
      type: 'date',
    },
    {
      field: 'dateUpdated',
      headerText: 'Last Modified',
      sortable: true,
      type: 'date',
    },
    {
      type: 'buttons',
      headerText: 'Buttons',
      buttons: [
        {
          label: 'Kolko',
          iconSvg: 'warning',
          btnTooltip: {
            tooltipText: 'Decline',
            tooltipPosition: 'bottom',
            positionLeft: 0,
          },
          width: 100,
        },
      ],
    },
  ];

  tableSettings = {
    ...DEFAULT_TABLE_SETTINGS,
  };

  data = [
    {
      manufacturerCode: 'manufacturerCode',
      manufacturerName: 'manufacturerName',
      dateCreated: new Date(),
      dateUpdated: new Date(),
    },
    {
      manufacturerCode: 'manufacturerCode',
      manufacturerName: 'manufacturerName',
      dateCreated: new Date(),
      dateUpdated: new Date(),
    },
  ];

  onRowClick(event: any): void {
    console.log('asd');
  }
}
