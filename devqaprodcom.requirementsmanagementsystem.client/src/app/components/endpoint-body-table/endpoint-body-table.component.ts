import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface JsonSchema {
  position: number;
  name: string;
  type: string;
}

const ELEMENT_DATA: JsonSchema[] = [
  { position: 1, name: 'id', type: 'string' }
];


@Component({
  selector: 'app-endpoint-body-table',
  templateUrl: 'endpoint-body-table.component.html',
  styleUrl: 'endpoint-body-table.component.css',
  standalone: true,
  imports: [
    MatTableModule
  ],
})

export class EndpointBodyTableComponent {
  displayedColumns: string[] = ['position', 'name', 'type'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<JsonSchema>();


}

