import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateBrandComponent } from './pages/create-brand.component';
import { BrandService } from './../../core/services/brand.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonComponent } from './../atomic-design/atoms/button/button.component';
import { InputComponent } from './../atomic-design/atoms/input/input.component';
import { TextareaComponent } from './../atomic-design/atoms/textarea/textarea.component';
import { HeaderComponent } from './../atomic-design/organisms/header/header.component';
import { NotificationComponent } from './../atomic-design/atoms/notification/notification.component';


describe('CreateBrandComponent', () => {
  let component: CreateBrandComponent;
  let fixture: ComponentFixture<CreateBrandComponent>;
  let brandService: BrandService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [
        CreateBrandComponent,
        ButtonComponent,    
        InputComponent,
        TextareaComponent,
        HeaderComponent,
        NotificationComponent
      ],
      providers: [
        BrandService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBrandComponent);
    component = fixture.componentInstance;
    brandService = TestBed.inject(BrandService);
    fixture.detectChanges();
  });

  it('debería crear el formulario en ngOnInit', () => {
    expect(component.brandForm).toBeTruthy();
    expect(component.brandForm.get('name')).toBeTruthy();
    expect(component.brandForm.get('description')).toBeTruthy();
  });

  it('debería llamar al servicio al crear una marca', fakeAsync(() => {
    jest.spyOn(brandService, 'createBrand').mockReturnValue(of(undefined));
  
    component.brandForm.setValue({
      name: 'Nueva marca',
      description: 'Descripción de prueba',
    });
  
    component.onSubmit();
  
    tick(); // Simula el tiempo para completar operaciones asíncronas
    flush();
  
    // Verifica que el servicio createBrand haya sido llamado con los datos correctos
    expect(brandService.createBrand).toHaveBeenCalledWith({
      name: 'Nueva marca',
      description: 'Descripción de prueba',
    });
  }));

  it('no debería llamar al servicio si el formulario es inválido', () => {
    jest.spyOn(brandService, 'createBrand');

    // Establece valores inválidos en el formulario
    component.brandForm.setValue({
      name: '',
      description: '',
    });

    component.onSubmit();

    // Verifica que createBrand no se llama si el formulario es inválido
    
  });
});
