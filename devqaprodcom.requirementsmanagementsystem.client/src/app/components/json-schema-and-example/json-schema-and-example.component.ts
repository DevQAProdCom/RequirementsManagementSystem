import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef, SimpleChanges, OnChanges, ElementRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { JsonSchemaHelper } from '../../helpers/jsonSchemaHelper';
import { JsonSchema } from '../../interfaces/jsonSchema';

@Component({
  selector: 'app-json-schema-and-example',
  templateUrl: 'json-schema-and-example.component.html',
  styleUrl: 'json-schema-and-example.component.css',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTabsModule
  ],
})

export class JsonSchemaAndExampleComponent implements OnInit, OnChanges {
  @Input() jsonSchema: JsonSchema[]= []
  @ViewChild('ResponseBodyJSONSchemaTab', { read: ViewContainerRef }) responseBodyJSONSchemaTab!: ViewContainerRef;
  @ViewChild('ResponseBodyExampleTab', { read: ViewContainerRef }) responseBodyExampleTab!: ViewContainerRef;
  //@ViewChild('ResponseBodyJSONSchemaTextArea', { read: ViewContainerRef }) responseBodyJSONSchemaTextArea!: ViewContainerRef;
  //@ViewChild('ResponseBodyExampleTextArea', { read: ViewContainerRef }) responseBodyExampleTextArea!: ViewContainerRef;

  @ViewChild('ResponseBodyJSONSchemaTextArea') responseBodyJSONSchemaTextArea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('ResponseBodyExampleTextArea') responseBodyExampleTextArea!: ElementRef<HTMLTextAreaElement>;

  constructor(public jsonSchemaHelper: JsonSchemaHelper) { }

  ngOnInit() {

  }

  jsonSchemaChanged(jsonSchema: JsonSchema[]) {
    this.jsonSchema = jsonSchema;
    var jsonSchemaString = this.jsonSchemaHelper.generateJsonSchema(this.jsonSchema);

    console.log("JsonSchemaAndExampleComponent jsonSchemaChanged");
    console.log(jsonSchemaString);


    if (this.responseBodyJSONSchemaTextArea) {
      console.log("CCCCC");

      this.responseBodyJSONSchemaTextArea.nativeElement.value = jsonSchemaString;
    }

    var jsonSchemaExampleString = this.jsonSchemaHelper.generateRandomExample(this.jsonSchema);
    console.log("JsonSchemaAndExampleComponent jsonSchemaChanged");
    console.log(jsonSchemaExampleString);

    if (this.responseBodyExampleTextArea) {
      this.responseBodyExampleTextArea.nativeElement.value = jsonSchemaExampleString;
    }
  }


  ngOnChanges(changes: SimpleChanges): void {

    if (changes['jsonSchema']) {
      //// httpEndpoint изменился
      //const prev = changes['jsonSchema'].previousValue;
      //const curr = changes['jsonSchema'].currentValue;
      //console.log(`jsonSchema изменился с ${prev} на ${curr}`);

      ////this.bddTextArea.nativeElement.value = this.groupAndFormatBDDLines(this.lines);
      //var jsonSchemaString = this.jsonSchemaHelper.generateJsonSchema(this.jsonSchema);
      //console.log(jsonSchemaString);


      //this.responseBodyJSONSchemaTextArea.textContent = jsonSchemaString;

      //var jsonSchemaExampleString = this.jsonSchemaHelper.generateRandomExample(this.jsonSchema);
      //console.log(jsonSchemaExampleString);

      //this.responseBodyExampleTextArea.textContent = jsonSchemaExampleString;
    }
  }
}

