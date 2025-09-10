import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-text-input-with-label',
  templateUrl: 'text-input-with-label.component.html',
  styleUrl: 'text-input-with-label.component.css',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})

export class TextInputWithLabelComponent implements OnInit {
  @Input() value = '';
  @Input() insideLabel: string = 'value';
  @Input() outsideLabel: string = '';
  @Input() customWidth: string = '100%';

  // Добавляем Output для отслеживания выбора значения
  @Output() inputChanged = new EventEmitter<string>();

  ngOnInit() {

  }

  onInputChange(newValue: string) {
    this.inputChanged.emit(newValue);
  }
}

