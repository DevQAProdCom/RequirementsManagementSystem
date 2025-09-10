import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RmsApiComponent } from './components/rms-api/rms-api.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { SingleSelectComponent } from './components/single-select/single-select.component';
import { CheckBoxMultiSelectComponent } from './components/checkbox-multi-select/checkbox-multi-select.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { EndpointBodyTableComponent } from './components/endpoint-body-table/endpoint-body-table.component';
import { EndpointBodyTable2Component } from './components/endpoint-body-table-2/endpoint-body-table-2.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { JsonSchemaAndExampleComponent } from './components/json-schema-and-example/json-schema-and-example.component';
import { JsonSchemaHelper } from './helpers/jsonSchemaHelper';
import { EndpointTabsComponent } from './components/endpoint-tabs/endpoint-tabs.component';
import { TextInputWithLabelComponent } from './components/text-input-with-label/text-input-with-label.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    RmsApiComponent
  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,

    AppRoutingModule,
    AutocompleteComponent,
    SingleSelectComponent,
    CheckBoxMultiSelectComponent,
    EndpointBodyTableComponent,
    EndpointBodyTable2Component,
    TextInputComponent,
    JsonSchemaAndExampleComponent,
    EndpointTabsComponent,
    TextInputWithLabelComponent
  ],
  providers: [JsonSchemaHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }
