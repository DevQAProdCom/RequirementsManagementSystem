import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges, OnInit, ViewChild, ElementRef, ViewContainerRef, Inject, Output, EventEmitter, ComponentRef } from '@angular/core';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { JsonSchema } from '../../interfaces/jsonSchema';
import { JsonSchemaAndExampleComponent } from '../json-schema-and-example/json-schema-and-example.component';
import { EndpointBodyTable2Component } from '../endpoint-body-table-2/endpoint-body-table-2.component';

interface BDDLine {
  //text: string; // add ass method
  type: BDDType;
  priority: number;
  parameterName: string,
  selectedValues: string[]
}

export enum BDDType {
  GIVEN = 'GIVEN',
  WHEN = 'WHEN',
  THEN = 'THEN'
}

@Component({
  selector: 'app-rms-api',
  standalone: false,
  templateUrl: './rms-api.component.html',
  styleUrl: './rms-api.component.css',
})

export class RmsApiComponent implements OnInit, OnChanges {
  @Input() httpEndpoint: string = 'Endpoint Name';
  @Input() httpMethod: string = '';

  @ViewChild('BDDTextArea', { read: ViewContainerRef }) bddTextArea!: ViewContainerRef;
  @ViewChild('GivenWhenThenArea', { read: ViewContainerRef }) givenWhenThenArea!: ViewContainerRef;
  @ViewChild('EndpointBodyTable', { read: ViewContainerRef }) endpointBodyTable!: ViewContainerRef;
  @ViewChild('MessageInput', { read: ViewContainerRef }) messageInput!: ViewContainerRef;


  @ViewChild(JsonSchemaAndExampleComponent) appJsonSchemaAndExample!: JsonSchemaAndExampleComponent;
  @ViewChild(EndpointBodyTable2Component) endpointBodyTable2Component!: EndpointBodyTable2Component;


  // Добавлено поле для хранения ссылки на компонент JsonSchemaAndExampleComponent
  jsonSchemaComponentRef!: ComponentRef<JsonSchemaAndExampleComponent>;


  @Output() onStatusCodeChanged = new EventEmitter<string>();

  //@Input() jsonSchema: JsonSchema[] = [];

  jsonSchemaChanged(jsonSchema: JsonSchema[]) {
    console.log("AAAAAA");

    if (this.jsonSchemaComponentRef) {
      console.log("BBBBB");

      this.jsonSchemaComponentRef.instance.jsonSchemaChanged(jsonSchema);
    }
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['httpEndpoint'] || changes['httpMethod']) {
      // httpEndpoint изменился
      const prev = changes['httpEndpoint'].previousValue;
      const curr = changes['httpEndpoint'].currentValue;
      console.log(`httpEndpoint изменился с ${prev} на ${curr}`);

      //this.bddTextArea.nativeElement.value = this.groupAndFormatBDDLines(this.lines);
      this.updateGivenWhenThenLabels();
    }
  }

  lines: BDDLine[] = [];

  public updateHttpEndpoint(httpEndpoint: string) {
    this.httpEndpoint = httpEndpoint;
    this.updateGivenWhenThenLabels();
  }

  public updateHttpMethod(httpMethod: string) {
    this.httpMethod = httpMethod;
    this.onHttpMethodSelected(httpMethod);
    this.updateGivenWhenThenLabels();
  }


  removeLineByParameterName(parameterName: string): void {
    this.lines = this.lines.filter(line => line.parameterName !== parameterName);
  }

  statusCodes: string[] = [
    '200 OK',
    '201 Created',
    '400 Bad Request',
    '404 Not Found',
    '403 Forbidden',
    '500 Internal Server Error'
  ];

  httpMethods: string[] = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
  ];

  roles: string[] = [
    'Admin Support',
    'Client Engagement',
    'Standard User'
  ];

  permissions: string[] = [
    'review:create',
    'review:update',
    'review:read'
  ];


  contentTypes: string[] = [
    'application/json',
    'application/xml',
    'text/plain',
    'multipart/form-data',
    'application/x-www-form-urlencoded'
  ];


  onRolesSelected(selectedValues: string[]) {
    if (this.givenWhenThenArea) {

      const parameterName = 'Roles';
      this.removeLineByParameterName(parameterName);

      if (selectedValues.length > 0) {
        const line: BDDLine = {
          //text: `user assumes any of next roles: "${selectedValues}"`,
          selectedValues: selectedValues,
          type: BDDType.GIVEN,
          priority: 1,
          parameterName: parameterName,
        };

        this.lines.push(line);
      }

      //this.bddTextArea.nativeElement.value = this.groupAndFormatBDDLines(this.lines);
      this.updateGivenWhenThenLabels();
    }
  }

  onPermissionsSelected(selectedValues: string[]) {
    if (this.givenWhenThenArea) {

      const parameterName = 'Permissions';
      this.removeLineByParameterName(parameterName);

      if (selectedValues.length > 0) {
        const line: BDDLine = {
          //text: `user has "${selectedValues}" permissions`,
          selectedValues: selectedValues,
          type: BDDType.GIVEN,
          priority: 2,
          parameterName: parameterName
        };

        this.lines.push(line);
        //this.bddTextArea.nativeElement.value = this.groupAndFormatBDDLines(this.lines);
      }

      this.updateGivenWhenThenLabels();

    }
  }

  onHttpMethodSelected(selectedValue: string) {
    if (this.givenWhenThenArea) {
      const parameterName = 'HTTP Method';
      this.removeLineByParameterName(parameterName);

      const line: BDDLine = {
        //text: `user invokes ${selectedValue} "${this.httpEndpoint}" endpoint`,

        selectedValues: [selectedValue],
        type: BDDType.WHEN,
        priority: 1,
        parameterName: parameterName
      };

      this.lines.push(line);
      this.updateGivenWhenThenLabels();

      //this.bddTextArea.nativeElement.value = this.groupAndFormatBDDLines(this.lines);
    }
  }

  onStatusCodeSelected(selectedValue: string) {
    if (this.givenWhenThenArea) {
      const parameterName = 'Status Code';
      this.removeLineByParameterName(parameterName);

      const line: BDDLine = {
        //text: `"${selectedValue}" status code is returned`,
        selectedValues: [selectedValue],
        type: BDDType.THEN,
        priority: 1,
        parameterName: parameterName
      };

      this.lines.push(line);
      //this.bddTextArea.nativeElement.value = this.groupAndFormatBDDLines(this.lines);
      this.updateGivenWhenThenLabels();

      this.onStatusCodeChanged.emit(selectedValue);
    }
  }

  onContentTypeSelected(selectedValue: string) {
    if (this.givenWhenThenArea) {
      const parameterName = 'Content Type';
      this.removeLineByParameterName(parameterName);

      const line: BDDLine = {
        //text: `"Content Type" Response Header is returned with value "${selectedValue}"`,
        selectedValues: [selectedValue],
        type: BDDType.THEN,
        priority: 2,
        parameterName: parameterName
      };

      this.lines.push(line);


      if (selectedValue == 'application/json')
        this.endpointBodyTable.element.nativeElement.style.visibility = 'visible';
      else
        this.endpointBodyTable.element.nativeElement.style.visibility = 'hidden';

      if (selectedValue == 'text/plain')
        this.messageInput.element.nativeElement.style.visibility = 'visible';
      else
        this.messageInput.element.nativeElement.style.visibility = 'hidden';


      //this.bddTextArea.nativeElement.value = this.groupAndFormatBDDLines(this.lines);
      this.updateGivenWhenThenLabels();
    }
  }

  onMessageEntered(value: string) {
    if (this.givenWhenThenArea) {
      const parameterName = 'Message';
      this.removeLineByParameterName(parameterName);

      const line: BDDLine = {
        //text: `"Content Type" Response Header is returned with value "${selectedValue}"`,
        selectedValues: [value],
        type: BDDType.THEN,
        priority: 3,
        parameterName: parameterName
      };

      this.lines.push(line);

      //this.bddTextArea.nativeElement.value = this.groupAndFormatBDDLines(this.lines);
      this.updateGivenWhenThenLabels();
    }
  }

  getStatusCodeText(selectedValue: string): string {
    return `Response Status Code "${selectedValue}" is returned`;
  }

  getContentTypeText(selectedValue: string): string[] {
    const texts = [
      `Response Header "Content Type" is returned with value "${selectedValue}"`
    ];
    if (selectedValue === 'application/json') {
      texts.push('Response Content Body is returned with data corresponding to the JSON Schema');
    }
    //else if (selectedValue === 'text/plain') {
    //  texts.push('Response Content Body is returned with text');
    //}
    return texts;
  }

  getMessageText(value: string): string {
    return `Response Content Body is returned with text '${value}'`;
  }


  getHttpMethodText(selectedValue: string): string {
    const endpoint = this.httpEndpoint && this.httpEndpoint.trim() ? this.httpEndpoint : 'Endpoint Name';
    return `user invokes ${selectedValue} "${endpoint}" endpoint`;
  }

  getPermissionsText(selectedValues: string[]): string {
    // Проверяем, установлен ли статус-код "403 Forbidden"
    const forbiddenLine = this.lines.find(line => line.parameterName === 'Status Code' && line.selectedValues[0] === '403 Forbidden');
    const hasNot = forbiddenLine ? 'has not' : 'has';

    if (selectedValues.length === 1) {
      return `user ${hasNot} "${selectedValues[0]}" permission`;
    } else {
      return `user ${hasNot} "${selectedValues.join('", "')}" permissions`;
    }
  }


  getRolesText(selectedValues: string[]): string {
    if (selectedValues.length === 1) {
      return `user assumes role: "${selectedValues[0]}"`;
    } else {
      return `user assumes any of next roles: "${selectedValues.join('", "')}"`;
    }
  }


  //groupAndFormatBDDLines(lines: BDDLine[]): string {
  //  // Группировка по типу (GIVEN, WHEN, THEN)
  //  const groupedByType: { [key in BDDType]?: BDDLine[] } = {};
  //  lines.forEach(line => {
  //    if (!groupedByType[line.type]) {
  //      groupedByType[line.type] = [];
  //    }
  //    groupedByType[line.type]!.push(line);
  //  });

  //  // Сортировка внутри каждой группы по priority
  //  Object.keys(groupedByType).forEach(type => {
  //    groupedByType[type as BDDType] = groupedByType[type as BDDType]!.sort((a, b) => a.priority - b.priority);
  //  });

  //  // Формирование текста для textAreaContent
  //  const order: BDDType[] = [BDDType.GIVEN, BDDType.WHEN, BDDType.THEN];
  //  const resultLines: string[] = [];

  //  order.forEach(type => {
  //    const group = groupedByType[type];
  //    if (group && group.length > 0) {
  //      group.forEach((line, idx) => {
  //        const prefix = idx === 0 ? type : 'AND';
  //        resultLines.push(`${prefix} ${line.text}`);
  //      });
  //    }
  //  });

  //  return resultLines.join('\n');
  //}

  updateGivenWhenThenLabels(): void {
    console.log("updateGivenWhenThenLabelsAAA");
    if (!this.givenWhenThenArea) return;

    // Очистить содержимое контейнера
    const container = this.givenWhenThenArea;
    container.element.nativeElement.innerHTML = '';

    // Группировка по типу
    const groupedByType: { [key in BDDType]?: BDDLine[] } = {};
    this.lines.forEach(line => {
      if (!groupedByType[line.type]) {
        groupedByType[line.type] = [];
      }
      groupedByType[line.type]!.push(line);
    });

    // Сортировка внутри каждой группы по priority
    Object.keys(groupedByType).forEach(type => {
      groupedByType[type as BDDType] = groupedByType[type as BDDType]!.sort((a, b) => a.priority - b.priority);
    });

    // Порядок типов
    const order: BDDType[] = [BDDType.GIVEN, BDDType.WHEN, BDDType.THEN];

    order.forEach(type => {
      const group = groupedByType[type];
      if (group && group.length > 0) {
        group.forEach((line, idx) => {
          let texts: string[] = [];
          switch (line.parameterName) {
            case 'Roles':
              texts = [this.getRolesText(line.selectedValues)];
              break;
            case 'Permissions':
              texts = [this.getPermissionsText(line.selectedValues)];
              break;
            case 'HTTP Method':
              texts = [this.getHttpMethodText(line.selectedValues[0])];
              break;
            case 'Status Code':
              texts = [this.getStatusCodeText(line.selectedValues[0])];
              break;
            case 'Content Type':
              texts = this.getContentTypeText(line.selectedValues[0]);
              break;
            case 'Message':
              texts = [this.getMessageText(line.selectedValues[0])];
              break;
            default:
              texts = [line.selectedValues.join(', ')];
          }
          texts.forEach((text, textIdx) => {
            const prefix = (idx === 0 && textIdx === 0) ? type : 'AND';
            const label = document.createElement('label');
            label.classList.add('font-cascadia'); // Добавить CSS-класс к каждому label
            label.textContent = `${prefix} ${text}`;
            container.element.nativeElement.appendChild(label);
            container.element.nativeElement.appendChild(document.createElement('br'));
          });

          if (line.parameterName === 'Content Type' && line.selectedValues[0] === 'application/json') {
            // Динамически создать и добавить JsonSchemaAndExampleComponent после label
            this.jsonSchemaComponentRef = container.createComponent(JsonSchemaAndExampleComponent);
            container.element.nativeElement.appendChild(this.jsonSchemaComponentRef.location.nativeElement);

            console.log("this.endpointBodyTable2Component.dataSource");
            console.log(this.endpointBodyTable2Component.dataSource);

            this.jsonSchemaChanged(this.endpointBodyTable2Component.dataSource);

            // Передать необходимые данные компоненту, если требуется
            // Например, если есть jsonSchema, можно передать так:
            // this.jsonSchemaComponentRef.instance.jsonSchema = this.appJsonSchemaAndExample?.jsonSchema;

            // Вставить компонент после последнего добавленного label
            // (createComponent уже добавляет в контейнер, поэтому ничего дополнительно делать не нужно)
          }

          //else if (line.parameterName === 'Message') {
          //  // Динамически создать и добавить JsonSchemaAndExampleComponent после label
          //  this.jsonSchemaComponentRef = container.createComponent(JsonSchemaAndExampleComponent);
          //  container.element.nativeElement.appendChild(this.jsonSchemaComponentRef.location.nativeElement);

          //  console.log("this.endpointBodyTable2Component.dataSource");
          //  console.log(this.endpointBodyTable2Component.dataSource);

          //  this.jsonSchemaChanged(this.endpointBodyTable2Component.dataSource);

          //  // Передать необходимые данные компоненту, если требуется
          //  // Например, если есть jsonSchema, можно передать так:
          //  // this.jsonSchemaComponentRef.instance.jsonSchema = this.appJsonSchemaAndExample?.jsonSchema;

          //  // Вставить компонент после последнего добавленного label
          //  // (createComponent уже добавляет в контейнер, поэтому ничего дополнительно делать не нужно)
          //}
        });
      }
    });
  }


  //updateGivenWhenThenLabels(): void {

  //  console.log("updateGivenWhenThenLabelsAAA");
  //    if (!this.givenWhenThenArea) return;

  //    // Очистить содержимое контейнера
  //  const container = this.givenWhenThenArea;
  //  container.element.nativeElement.innerHTML = '';

  //    // Группировка по типу
  //    const groupedByType: { [key in BDDType]?: BDDLine[] } = {};
  //    this.lines.forEach(line => {
  //      if (!groupedByType[line.type]) {
  //        groupedByType[line.type] = [];
  //      }
  //      groupedByType[line.type]!.push(line);
  //    });

  //    // Сортировка внутри каждой группы по priority
  //    Object.keys(groupedByType).forEach(type => {
  //      groupedByType[type as BDDType] = groupedByType[type as BDDType]!.sort((a, b) => a.priority - b.priority);
  //    });

  //    // Порядок типов
  //    const order: BDDType[] = [BDDType.GIVEN, BDDType.WHEN, BDDType.THEN];

  //    order.forEach(type => {
  //      const group = groupedByType[type];
  //      if (group && group.length > 0) {
  //        group.forEach((line, idx) => {
  //          let text = '';
  //          switch (line.parameterName) {
  //            case 'Roles':
  //              text = this.getRolesText(line.selectedValues);
  //              break;
  //            case 'Permissions':
  //              text = this.getPermissionsText(line.selectedValues);
  //              break;
  //            case 'HTTP Method':
  //              text = this.getHttpMethodText(line.selectedValues[0]);
  //              break;
  //            case 'Status Code':
  //              text = this.getStatusCodeText(line.selectedValues[0]);
  //              break;
  //            case 'Content Type':
  //              text = this.getContentTypeText(line.selectedValues[0]);
  //              break;
  //            default:
  //              text = line.selectedValues.join(', ');
  //          }
  //          const prefix = idx === 0 ? type : 'AND';
  //          const label = document.createElement('label');
  //          label.textContent = `${prefix} ${text}`;
  //          container.element.nativeElement.appendChild(label);
  //          container.element.nativeElement.appendChild(document.createElement('br'));
  //        });
  //      }
  //    });
  //  }

}
