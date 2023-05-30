import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'centered-spinner',
  template: `
    <div
      style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;"
    >
      <ion-spinner></ion-spinner>
      <p>Loading...</p>
    </div>
  `,
})
export class SpinnerComponent {}

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [SpinnerComponent],
  exports: [SpinnerComponent],
})
export class SpinnerComponentModule {}
