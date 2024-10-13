import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';  // Ajusta la ruta según la ubicación real
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  categoryForm!: FormGroup ;  // Declaramos el FormGroup para el formulario

  constructor(
    private readonly formBuilder: FormBuilder,    // Usamos FormBuilder para crear el formulario
    private readonly categoryService: CategoryService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();  // Inicializamos el formulario en el hook ngOnInit
  }

  // Método para inicializar el formulario
  initializeForm(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(90)]]
    });
  }

  // Método que se llama al enviar el formulario
  onSubmit(): void {
    if (this.categoryForm?.valid) {
      console.log('Formulario enviado', this.categoryForm.value);
      this.categoryService.createCategory(this.categoryForm.value).subscribe({
        next: (response) => {
          console.log('Categoría creada con éxito:', response);
          this.categoryForm?.reset();
          //this.router.navigate(['/categories']);
        },
        error: (error) => {
          console.error('Error al crear la categoría:', error);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
