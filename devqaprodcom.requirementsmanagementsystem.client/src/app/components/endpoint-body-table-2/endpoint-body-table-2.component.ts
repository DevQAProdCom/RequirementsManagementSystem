import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { SingleSelectComponent } from '../single-select/single-select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TextInputComponent } from '../text-input/text-input.component';
import { JsonSchema } from '../../interfaces/jsonSchema';

let ELEMENT_DATA: JsonSchema[] = [
  //{ position: 1, name: 'id', type: 'string' },
  { position: 1, fieldName: '', fieldDataType: '' }

];

@Component({
  selector: 'app-endpoint-body-table-2',
  templateUrl: 'endpoint-body-table-2.component.html',
  styleUrl: 'endpoint-body-table-2.component.css',
  standalone: true,
  imports: [
    MatTableModule,
    SingleSelectComponent,
    MatInputModule,
    FormsModule,
    TextInputComponent
  ],
})

export class EndpointBodyTable2Component {
  displayedColumns: string[] = ['position', 'name', 'type'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<JsonSchema>();

  @Output() jsonSchemaChanged = new EventEmitter<JsonSchema[]>();



  jsonSchemaDataTypes: string[] = [
    'null',
    'string',
    'number',
    'integer',
    'boolean',
    'array',
    'object'
  ];

  onJsonSchemaFieldNameSet(fieldName: string, index: number) {
    console.log('Set field name:', fieldName, 'at index:', index);
    this.setRowData({ position: index + 1, fieldName: fieldName });
  }

  onJsonSchemaDataTypeSelected(fieldDataType: string, index: number) {
    console.log('Selected data type:', fieldDataType, 'at index:', index);
    this.setRowData({ position: index + 1, fieldDataType: fieldDataType });

  }



  setRowData(schema: JsonSchema) {

    if (schema.position == ELEMENT_DATA.length) {
      ELEMENT_DATA.push({ position: schema.position + 1, fieldName: '', fieldDataType: '' });
    }


    if (schema.fieldName !== undefined) {
      ELEMENT_DATA[schema.position - 1].fieldName = schema.fieldName;
    }

    if (schema.fieldDataType !== undefined) {
      ELEMENT_DATA[schema.position - 1].fieldDataType = schema.fieldDataType;
    }

    console.log('Updated schema:', ELEMENT_DATA);


    //const newIndex = this.dataSource.length + 1;
    //this.dataSource.push({ position: newIndex, fieldName: '', fieldDataType: '' });
    //this.dataSource = [...this.dataSource]; // Обновляем ссылку на массив
    //this.dataSource = ELEMENT_DATA; // Обновляем ссылку на массив
    this.dataSource = [...ELEMENT_DATA];
    this.jsonSchemaChanged.emit(ELEMENT_DATA);
  }
}





