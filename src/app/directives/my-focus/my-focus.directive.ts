import { Directive, OnInit, Input, ElementRef, Renderer, OnChanges } from '@angular/core';

@Directive({
  selector: '[myFocus]'
})
export class MyFocusDirective implements OnInit, OnChanges {

  @Input('myFocus') isFocused: boolean;

  constructor(private hostElement: ElementRef, private renderer: Renderer) {}

  ngOnInit() {
    /*if (this.isFocused) {
      this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'focus');
    }*/
  }

  ngOnChanges() {
    if (this.isFocused) {
      this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'focus');
    }
  }

}
