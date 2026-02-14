import { TemplateRef } from '@angular/core';
import { FieldType } from '../enums/dynamic-form-field.enum';

export interface DynamicFieldConfig {
  formControlName: string;
  label?: string;
  type: FieldType;
  placeholder?: string;
  options?: any[];
  optionLabel?: string;
  optionValue?: string;
  template?: TemplateRef<any>;
  validators?: any[];
  initialValue?: any;
  disabled?: boolean;
  required?: boolean;
}
