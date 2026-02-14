import { Component, computed, input } from '@angular/core';
import { DynamicFieldConfig } from '../../../core/models/dynamic-form-field.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { MultiSelect } from 'primeng/multiselect';
import { DatePicker } from 'primeng/datepicker';
import { Textarea } from 'primeng/textarea';
import { FieldType } from '../../../core/enums/dynamic-form-field.enum';

@Component({
  selector: 'task-manager-dynamic-form-field',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputText,
    Select,
    MultiSelect,
    Textarea,
    DatePicker,
  ],
  templateUrl: './dynamic-form-field.html',
  styleUrl: './dynamic-form-field.scss',
})
export class DynamicFormField {
  public field = input.required<DynamicFieldConfig>();
  public form = input.required<FormGroup>();
  public fieldType = FieldType;

  private control = computed(() => this.form().get(this.field().formControlName));
}
