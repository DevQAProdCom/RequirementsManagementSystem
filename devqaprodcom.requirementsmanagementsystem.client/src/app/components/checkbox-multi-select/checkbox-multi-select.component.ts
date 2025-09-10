import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
export interface User {
  name: string;
}

@Component({
  selector: 'app-checkbox-multi-select',
  templateUrl: 'checkbox-multi-select.component.html',
  styleUrl: 'checkbox-multi-select.component.css',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
})

export class CheckBoxMultiSelectComponent implements OnInit {
  formControl = new FormControl('');
  @Input() options!: string[];
  @Input() entityName: string = 'Option';

  // Добавляем Output для отслеживания выбора значения
  @Output() valueSelected = new EventEmitter<string[]>();

  ngOnInit() {
 
  }

  // Метод для обработки выбора значения
  selectionChange(event: MatSelectChange) {
    console.log('Selected values:', event.value); // event.value: string[]
    this.valueSelected.emit(event.value);
  }
}

