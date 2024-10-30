import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../../../core/services/article.service';
import { BrandService, Brand } from '../../../core/services/brand.service';
import { NotificationComponent } from './../../atomic-design/atoms/notification/notification.component';
import { debounceTime, distinctUntilChanged, switchMap, map, startWith } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  @ViewChild(NotificationComponent) notificationComponent!: NotificationComponent;
  articleForm!: FormGroup;
  brands: Brand[] = [];
  selectedBrand!: Brand | null;
  showSuggestions: boolean = false;

  private searchTerms = new Subject<string>();
  filteredBrands$!: Observable<Brand[]>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly articleService: ArticleService,
    private readonly brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getBrands();

    // Configurar el flujo de búsqueda con debounce y startWith
    this.filteredBrands$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.filterBrands(term)),
      startWith([]) // Emite un array vacío inicialmente
    );
  }

  initializeForm(): void {
    this.articleForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(90)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0.1)]],
      categoryIds: ['', [Validators.required]],
      brandName: ['', Validators.required] // Usamos el nombre de la marca en vez del ID
      // Eliminamos brandId del formulario
    });
  }

  getBrands(): void {
    this.brandService.getBrands(0, 100, 'ASC').subscribe({
      next: (response) => {
        this.brands = response.content;
      },
      error: (error) => {
        console.error('Error al obtener las marcas:', error);
      }
    });
  }

  // Método para manejar la entrada del usuario
  onBrandInput(): void {
    const inputValue = this.articleForm.get('brandName')?.value || '';
    this.searchTerms.next(inputValue.toLowerCase());
  }

  // Filtrar marcas basadas en la entrada del usuario
  filterBrands(term: string): Observable<Brand[]> {
    if (term.length === 0) {
      return of([]); // Emite un array vacío si el término está vacío
    }
    return this.brandService.getBrands(0, 10, 'ASC').pipe(
      map(response => response.content.filter(brand =>
        brand.name.toLowerCase().startsWith(term)
      ))
    );
  }

  selectBrand(brand: Brand): void {
    this.selectedBrand = brand;
    this.articleForm.get('brandName')?.setValue(brand.name);
    this.showSuggestions = false;
  }

  onSubmit(): void {
    if (this.articleForm.valid && this.selectedBrand) {
      const formValue = this.articleForm.value;
      formValue.brandId = this.selectedBrand.id; // Añadimos el ID de la marca al enviar el formulario

      this.articleService.createArticle(formValue).subscribe({
        next: () => {
          this.notificationComponent.show('Artículo creado con éxito', 'success');
          this.articleForm.reset();
          this.selectedBrand = null;
          this.showSuggestions = false;
        },
        error: (error) => {
          console.error('Error al crear el artículo:', error);
          this.notificationComponent.show('Error al crear el artículo', 'error');
        }
      });
    } else {
      console.log('Formulario no válido o marca no seleccionada');
    }
  }

  // Manejar clics fuera del componente para cerrar las sugerencias
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.autocomplete-container')) {
      this.showSuggestions = false;
    }
  }

  // Mostrar sugerencias al enfocar el input
  onFocus(): void {
    this.showSuggestions = true;
  }
}
