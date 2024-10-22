import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BrandService } from '../../../core/services/brand.service';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationComponent } from './../../atomic-design/atoms/notification/notification.component';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss']
})
export class CreateBrandComponent implements OnInit {
  @ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;
  brandForm!: FormGroup;  // Formulario para crear marcas (Brand)

  constructor(
    private readonly formBuilder: FormBuilder,  // Constructor para crear el formulario
    private readonly brandService: BrandService,  // Servicio para manejar marcas
    private readonly router: Router  // Router para posibles redirecciones
  ) {}

  ngOnInit(): void {
    this.initializeForm();  // Inicializa el formulario en la carga del componente
  }

  // Inicializa el formulario con validaciones para los campos 'name' y 'description'
  initializeForm(): void {
    this.brandForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(90)]]
    });
  }

  // Lógica al enviar el formulario para crear una nueva marca
  onSubmit(): void {
    if (this.brandForm?.valid) {
      console.log('Formulario enviado', this.brandForm.value);
      this.brandService.createBrand(this.brandForm.value).subscribe({
        next: (response) => {
          this.notificationComponent.show('Marca creada con éxito', 'success');
        },
        error: (error) => {
          console.error('Error al crear la marca:', error);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
