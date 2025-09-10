import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface User {
  name: string;
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: 'autocomplete.component.html',
  styleUrl: 'autocomplete.component.css',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
})

export class AutocompleteComponent implements OnInit {
  formControl = new FormControl('');
  @Input() options!: string[];
  filteredOptions!: Observable<string[]>;
  @Input() entityName: string = 'Option';

  // Добавляем Output для отслеживания выбора значения
  @Output() valueSelected = new EventEmitter<string>();

  ngOnInit() {
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  // Метод для обработки выбора значения
  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    console.log('Selected value:', event.option.value);
    this.valueSelected.emit(event.option.value);
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}

