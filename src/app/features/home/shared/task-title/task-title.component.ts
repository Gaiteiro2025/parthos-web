import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-title',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  template: `
  <div class="task-title-container">
    <div class="title-wrapper" *ngIf="!editing" (click)="toggleEditing()">
      <span class="task-title">{{ getFormControl().value || 'Nova Tarefa' }}</span>
      <mat-icon class="edit-icon">edit</mat-icon>
    </div>

    <div *ngIf="editing" class="edit-wrapper">
      <input #titleInput class="task-title-input" [formControl]="getFormControl()" (blur)="saveOrCancelEdit()" autofocus />
      <button mat-icon-button color="warn" (mousedown)="cancelEditing($event)">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  </div>
  `,
  styleUrls: ['./task-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskTitleComponent {
  @Input() control!: AbstractControl<any, any> | null;
  editing = false;
  private originalValue = '';

  getFormControl() {
    return this.control as FormControl;
  }

  toggleEditing() {
    this.originalValue = this.getFormControl().value;
    this.editing = true;
  }

  saveOrCancelEdit() {
    this.editing = false;
    this.getFormControl().updateValueAndValidity();

  }

  cancelEditing(event: Event) {
    event.preventDefault();
    this.getFormControl().patchValue(this.originalValue, { emitEvent: true });
    this.getFormControl().updateValueAndValidity();
    this.editing = false;
  }
}
