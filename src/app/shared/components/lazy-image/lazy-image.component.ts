import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public title!: string;

  public hasLoaded: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (!this.url) throw new Error('Url is required');
    if (!this.title) throw new Error('Title is required');
  }

  onLoad(): void {
    // setTimeout(() => { this.hasLoaded = true; }, 1000);
    this.hasLoaded = true;
  }

}
