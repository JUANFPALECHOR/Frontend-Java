import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService, Category } from '../../../core/services/category.service';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  categoryForm!: FormGroup;  // Formulario para crear categorías
  categories: Category[] = [];  // Almacena las categorías obtenidas
  currentPage: number = 0;  // Página actual para la paginación
  currentOrder: 'asc' | 'desc' = 'asc';  // Orden de las categorías
  hasMoreCategories: boolean = true;  // Indica si hay más categorías disponibles para paginación

  constructor(
    private readonly formBuilder: FormBuilder,  // Constructor para crear el formulario
    private readonly categoryService: CategoryService,  // Servicio para manejar categorías
    private readonly router: Router  // Router para posibles redirecciones
  ) {}

  ngOnInit(): void {
    this.initializeForm();  // Inicializa el formulario en la carga del componente
    this.getCategories(this.currentPage, 10, this.currentOrder);  // Obtiene las primeras categorías
  }

  // Inicializa el formulario con validaciones para los campos 'name' y 'description'
  initializeForm(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(90)]]
    });
  }

  // Lógica al enviar el formulario para crear una nueva categoría
  onSubmit(): void {
    if (this.categoryForm?.valid) {
      console.log('Formulario enviado', this.categoryForm.value);
      this.categoryService.createCategory(this.categoryForm.value).subscribe({
        next: (response) => {
          console.log('Categoría creada con éxito:', response);
        },
        error: (error) => {
          console.error('Error al crear la categoría:', error);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  // Método para obtener categorías de manera paginada y ordenada
  getCategories(page: number, size: number, order: 'asc' | 'desc'): void {
    // Si el orden cambia, reinicia las categorías para evitar duplicación
    if (order !== this.currentOrder) {
      this.categories = [];
      this.currentPage = 1; // Reinicia la página cuando cambias el orden
    }
  
    // Llamar al servicio para obtener las categorías
    this.categoryService.getCategories(page, size, order).subscribe({
      next: (response) => {
        // Actualiza la lista de categorías con los nuevos datos obtenidos
        this.categories = response.content;
        this.currentPage = page;  // Actualiza la página actual
        this.hasMoreCategories = !response.last;  // Verifica si hay más páginas
        this.currentOrder = order;  // Actualiza el orden actual
        console.log('Categorías obtenidas:', this.categories);
      },
      error: (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    });
  }
  
  
  
  
  

  // Maneja la acción cuando se presiona la tecla 'Enter'
  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log('Enter key pressed');
    }
  }  
}
