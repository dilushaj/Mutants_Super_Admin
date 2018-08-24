import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';


@Directive({
  selector: '[CustomObject]',
  exportAs: 'CustomObject'
})
export class CustomObjectDirective {
  // @Input() values: any = {};
  //
  //
  // @Input() CustomObject;
  // ngOnInit() {
  //   if (this.CustomObject) { this.CustomObject(); }
  // }

  @Input()
  set CustomObject(context: any) {
    this.context.$implicit = this.context.CustomObject = context;
    this.vcRef.clear();
    this.vcRef.createEmbeddedView(this.templateRef, this.context);
  }
  context: { $implicit?: any, CustomObject?: any } = {};
  constructor(private vcRef: ViewContainerRef, private templateRef: TemplateRef<any>) { }

}
