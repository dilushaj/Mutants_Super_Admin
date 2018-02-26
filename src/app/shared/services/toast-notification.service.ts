import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ToastNotificationService {

  option: any = {toastLife: 3000, showCloseButton: true};

  constructor(public toastr: ToastsManager) {}

  setRootViewContainerRef(viewContainerRef) {
    this.toastr.setRootViewContainerRef(viewContainerRef);
  }

  toastSuccess(body: any) {
    this.toastr.success(body, 'Success !', this.option);
  }

  toastError(body: any) {
    this.toastr.error(body, 'Oops!', this.option);
  }

  toastWarning(body: any) {
    this.toastr.warning(body, 'Warning!', this.option);
  }

  toastInfo(body: any) {
    this.toastr.info(body, 'Info!', this.option);
  }

  toastCustom() {
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
  }

}
