import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'sacchon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sacchon-app';

  bgColor = 'grey';

  status = false;

  constructor(private renderer: Renderer2) {
  }
}
