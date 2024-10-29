import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../../../core/services/article.service';
import { NotificationComponent } from '../../atomic-design/atoms/notification/notification.component';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  @ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;
  articleForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.initializeForm();  // Inicializar el formulario al cargar el componente
  }

  // Inicializar el formulario con los campos requeridos
  initializeForm(): void {
    this.articleForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(90)]],
      quantity: [null, [Validators.required, Validators.min(0)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      categoryIds: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      brandId: [null, [Validators.required]]
    });
  }

  // Lógica para enviar el formulario
  onSubmit(): void {
    if (this.articleForm.valid) {
      console.log('Formulario enviado', this.articleForm.value);
      this.articleService.createArticle(this.articleForm.value).subscribe({
        next: () => {
          this.notificationComponent.show('Artículo creado con éxito', 'success');
          this.articleForm.reset();
        },
        error: (error) => {
          console.error('Error al crear el artículo:', error);
          this.notificationComponent.show('Error al crear el artículo', 'error');
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
