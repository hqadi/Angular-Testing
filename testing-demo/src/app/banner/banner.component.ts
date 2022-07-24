import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-banner',
    template: `
    <h1>{{ title }}</h1>
    <p>
      banner works!
    </p>
    <p>
      second paragraph
    </p>
    <div id="main">main div</div>
    <h2 appHighlight='skyblue'>Highlighted</h2>
  `,
    styles: ['h1 { color: green; font-size: 350% }']
})
export class BannerComponent implements OnInit {
    title = 'banner title';

    constructor() { }

    ngOnInit(): void {}
}
