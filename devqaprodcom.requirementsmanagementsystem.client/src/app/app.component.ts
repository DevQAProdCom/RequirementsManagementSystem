import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {
  httpEndpoint: string = '';
  httpMethod: string = '';


  httpMethods: string[] = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
  ];

  constructor() {}

  ngOnInit() {

  }

  onEndpointInputChange(newValue: string) {
    this.httpEndpoint = newValue;
  }

  onHttpMethodSelected(selectedValue: string) {
    this.httpMethod = selectedValue;
  }
}

