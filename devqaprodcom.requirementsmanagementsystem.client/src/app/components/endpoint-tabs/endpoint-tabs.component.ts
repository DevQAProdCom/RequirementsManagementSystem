import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, Injector, ViewChildren, ViewContainerRef, QueryList, AfterViewInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { RmsApiComponent } from '../rms-api/rms-api.component';
import { MatIconModule } from '@angular/material/icon';

export interface DynamicTab {
  label: string;
  // content теперь может быть либо строкой, либо Angular компонентом
  content?: any; // any: тип компонента, например, Type<any>
}

@Component({
  selector: 'app-endpoint-tabs',
  templateUrl: 'endpoint-tabs.component.html',
  styleUrl: 'endpoint-tabs.component.css',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    CommonModule,
    MatIconModule
  ],
})

export class EndpointTabsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() dynamicTabs: DynamicTab[] = [];
  @Input() httpEndpoint: string = '';
  @Input() httpMethod: string = '';

  @ViewChildren('tabHost', { read: ViewContainerRef }) tabHosts!: QueryList<ViewContainerRef>;

  //@Input() value = '';
  //@Input() label: string = 'value';
  //// Добавляем Output для отслеживания выбора значения
  //@Output() inputChanged = new EventEmitter<string>();

  statusCodeLabel = 'STATUS CODE';
  addNewLabel = 'ADD NEW';

  ngOnInit() {
    this.dynamicTabs = [
      { label: this.statusCodeLabel },
      { label: this.addNewLabel }
    ]
  }

  ngAfterViewInit() {
    // Динамически создаём компоненты и сохраняем ссылки
    this.tabHosts.forEach((viewContainerRef, idx) => {
      viewContainerRef.clear();
      const compRef = viewContainerRef.createComponent(RmsApiComponent);
      this.dynamicTabs[idx].content = compRef;
      compRef.instance.updateHttpEndpoint(this.httpEndpoint);
      compRef.instance.updateHttpEndpoint(this.httpMethod);

      compRef.instance.onStatusCodeChanged.subscribe((newLabel: string) => {
        this.dynamicTabs[idx].label = newLabel;
      });
    });
  }

  addNewTab() {
    // Добавляем новый таб с компонентом RmsApiComponent
    this.dynamicTabs.push({ label: this.addNewLabel });

    // Даем Angular время отрисовать новый tabHost
    setTimeout(() => {
      const idx = this.dynamicTabs.length - 1;
      const viewContainerRef = this.tabHosts.get(idx);
      if (viewContainerRef) {
        viewContainerRef.clear();
        const compRef = viewContainerRef.createComponent(RmsApiComponent);
        this.dynamicTabs[idx].content = compRef;
        compRef.instance.updateHttpEndpoint(this.httpEndpoint);
        compRef.instance.updateHttpMethod(this.httpMethod);

        compRef.instance.onStatusCodeChanged.subscribe((newLabel: string) => {
          this.dynamicTabs[idx].label = newLabel;
        });
      }
    });
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['httpEndpoint'] && this.dynamicTabs.length) {
      this.dynamicTabs.forEach(tab => {
        if (tab.content) {
          tab.content.instance.updateHttpEndpoint(this.httpEndpoint);
        }
      });
    }

    if (changes['httpMethod'] && this.dynamicTabs.length) {
      this.dynamicTabs.forEach(tab => {
        if (tab.content) {
          tab.content.instance.updateHttpMethod(this.httpMethod);
        }
      });
    }
  }

  onTabClicked(index: number) {
    console.log('Add New Tab clicked');

    if (index == this.dynamicTabs.length - 1) {
      console.log('Add New Tab clicked');

      this.dynamicTabs[index].label = this.statusCodeLabel;
      this.addNewTab()
    }
  }
}


  //ngOnChanges(changes: SimpleChanges): void {
  //  if (changes['httpEndpoint']) {
  //    const prev = changes['httpEndpoint'].previousValue;
  //    const curr = changes['httpEndpoint'].currentValue;
  //    console.log(`httpEndpoint изменился  ASDSDSDSDSD с ${prev} на ${curr}`);

  //    // Проверяем, что tab.content действительно является экземпляром компонента и содержит метод updateHttpEndpoint
  //    this.dynamicTabs.forEach(tab => {
  //      if (tab.content && typeof tab.content.updateHttpEndpoint === 'function') {
  //        tab.content.updateHttpEndpoint(this.httpEndpoint);
  //      } else {
  //        console.warn(`tab.content для "${tab.label}" не содержит метода updateHttpEndpoint`);
  //      }
  //    });
  //  }
  //}

//this.dynamicTabs.forEach(tab => {
//  if (tab.content && typeof tab.content === 'object' && 'httpEndpoint' in tab.content) {
//    console.log('httpEndpoint изменился: TTTTTTTTTTTTT', changes['httpEndpoint']);

//    tab.content.updateHttpEndpoint(this.httpEndpoint);
//  }
//});
