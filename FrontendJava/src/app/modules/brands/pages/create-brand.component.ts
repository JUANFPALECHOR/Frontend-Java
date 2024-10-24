import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BrandService, Brand } from '../../../core/services/brand.service';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationComponent } from './../../atomic-design/atoms/notification/notification.component';


@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss']
})
export class CreateBrandComponent implements OnInit {
  @ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;
  brandForm!: FormGroup;
  brands: Brand[] = [];  // Almacena las marcas obtenidas
  currentPage: number = 0; // Página actual para la paginación
  totalPages: number = 0;
  currentSortDirection: 'ASC' | 'DESC' = 'ASC';  // Orden de las marcas
  hasMoreBrands: boolean = true;  // Indica si hay más marcas disponibles para paginación

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly brandService: BrandService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();  // Inicializa el formulario en la carga del componente
    this.getBrands(this.currentPage, 10, this.currentSortDirection);  // Obtiene las primeras marcas
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

  // Método para obtener las marcas con paginación y ordenación
  getBrands(page: number, size: number, sortDirection: 'ASC' | 'DESC'): void {
    if (sortDirection !== this.currentSortDirection || page !== this.currentPage) {
      this.brands = [];
    }

    this.brandService.getBrands(page, size, sortDirection).subscribe({
      next: (response) => {
        this.brands = response.content;
        this.currentPage = page;
        this.hasMoreBrands = !response.last;
        this.totalPages = response.totalPages;
        this.currentSortDirection = sortDirection;
        console.log('Marcas obtenidas:', this.brands);
      },
      error: (error) => {
        console.error('Error al obtener las marcas:', error);
      }
    });
  }
}
