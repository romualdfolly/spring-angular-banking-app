import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-loading-component',
  styleUrl: './loading-component.css',
  templateUrl: './loading-component.html',
})
export class LoadingComponent {
  @Input() liClassName: string = '';

  readonly nChild = 6;
}
