import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  styleUrl: './alert.css',
  templateUrl: './alert.html',
})
export class Alert {
  @Input({ required: true }) type!: 'success' | 'error';
  @Input({ required: true }) message!: string;
}