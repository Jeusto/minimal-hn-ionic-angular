import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

type ToastType = 'success' | 'warning' | 'danger';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  dismissButton = {
    text: 'Dismiss',
    role: 'cancel',
    handler: () => {},
  };

  async showToast(
    message: string,
    type: ToastType = 'success',
    duration: number = 2000
  ) {
    this.toastController
      .create({
        message,
        duration,
        color: type,
        position: 'bottom',
        cssClass: 'toast',
        buttons: [this.dismissButton],
      })
      .then((toast) => toast.present());
  }
}
