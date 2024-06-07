import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'industryTypes',
  standalone: true
})
export class IndustryTypesPipe implements PipeTransform {
  private businessTypes: Record<number, string> = {
    1: 'Tecnología',
    2: 'Salud',
    3: 'Automotriz',
    4: 'Alimentos y bebidas',
    5: 'Energía',
    6: 'Educación',
    7: 'Moda',
    8: 'Turismo',
    9: 'Entretenimiento',
    10: 'Construcción',
    11: 'Finanzas',
    12: 'Bienes raíces',
    13: 'Medios de comunicación',
    14: 'Transporte',
    15: 'Agricultura',
    16: 'Manufactura',
    17: 'Telecomunicaciones',
    18: 'Servicios profesionales',
    19: 'Medio ambiente',
    20: 'Arte y cultura',
  };

  transform(value: number): string {
    return this.businessTypes[value] || 'Desconocido';
  }
}