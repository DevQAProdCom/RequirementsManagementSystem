import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-single-select',
  templateUrl: 'single-select.component.html',
  styleUrl: 'single-select.component.css',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
})

export class SingleSelectComponent implements OnInit {
  @Input() selected = '';
 // formControl = new FormControl(this.selected);
  @Input() options!: string[];
  @Input() entityName: string = 'Option';

  // Добавляем Output для отслеживания выбора значения
  @Output() valueSelected = new EventEmitter<string>();

  ngOnInit() {

  }

  // Метод для обработки выбора значения
  selectionChange(event: MatSelectChange) {
    console.log('Selected values:', event.value); // event.value: string[]
    this.valueSelected.emit(event.value);
  }
}

