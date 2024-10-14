// src/app/modules/atomic-design/atomic.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './atoms/button/button.component';
import { InputComponent } from './atoms/input/input.component';
import { TextareaComponent } from './atoms/textarea/textarea.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ButtonComponent, InputComponent, TextareaComponent],
  imports: [CommonModule, FormsModule],
  exports: [ButtonComponent, InputComponent, TextareaComponent],
})
export class AtomicModule {}
