import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor() { }
  @Input() msg: string;
  @Output() close = new EventEmitter<void>();

  ngOnInit(): void {
  }

  onClose() {
    this.close.emit();
  }

}
