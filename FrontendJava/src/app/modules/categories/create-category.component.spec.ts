import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCategoryComponent } from './pages/create-category.component';
import { CategoryService } from './../../core/services/category.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonComponent } from './../atomic-design/atoms/button/button.component';
import { InputComponent } from './../atomic-design/atoms/input/input.component';
import { TextareaComponent } from './../atomic-design/atoms/textarea/textarea.component';

describe('CreateCategoryComponent', () => {
  let component: CreateCategoryComponent;
  let fixture: ComponentFixture<CreateCategoryComponent>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [
        CreateCategoryComponent,
        ButtonComponent,    
        InputComponent,
        TextareaComponent
      ],
      providers: [
        CategoryService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCategoryComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService);
    fixture.detectChanges();
  });

  it('debería crear el formulario en ngOnInit', () => {
    expect(component.categoryForm).toBeTruthy();
    expect(component.categoryForm.get('name')).toBeTruthy();
    expect(component.categoryForm.get('description')).toBeTruthy();
  });

  it('debería llamar al servicio al crear una categoría', fakeAsync(() => {
    jest.spyOn(categoryService, 'createCategory').mockReturnValue(of(undefined));
  
    component.categoryForm.setValue({
      name: 'Nueva categoría',
      description: 'Descripción de prueba',
    });
  
    component.onSubmit();
  
    tick(); // Simula el tiempo para completar operaciones asíncronas
  
    // Verifica que el servicio createCategory haya sido llamado con los datos correctos
    expect(categoryService.createCategory).toHaveBeenCalledWith({
      name: 'Nueva categoría',
      description: 'Descripción de prueba',
    });
  
  }));

  it('no debería llamar al servicio si el formulario es inválido', () => {
    jest.spyOn(categoryService, 'createCategory');

    // Establece valores inválidos en el formulario
    component.categoryForm.setValue({
      name: '',
      description: '',
    });

    component.onSubmit();

    // Verifica que createCategory no se llama si el formulario es inválido
    expect(categoryService.createCategory).not.toHaveBeenCalled();
  });
});
