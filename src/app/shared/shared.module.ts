import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatInputModule, MatLabel } from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatLabel
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatLabel
  ]
})
export class SharedModule { }
