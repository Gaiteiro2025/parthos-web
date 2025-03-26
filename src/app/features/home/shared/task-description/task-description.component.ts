import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, SecurityContext } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { MarkdownModule, MarkdownService } from 'ngx-markdown'; // Importar o módulo

@Component({
  selector: 'app-task-description',
  imports: [
    CommonModule,           // Importa o CommonModule
    ReactiveFormsModule,    // Importa ReactiveFormsModule
    MatFormFieldModule,     // Importa MatFormFieldModule
    FormsModule,
    MatTabsModule,
    MarkdownModule
  ],
  providers: [MarkdownService],  // Fornecendo o MarkdownService diretamente

  standalone: true,
  templateUrl: './task-description.component.html',
  styleUrls: ['./task-description.component.scss']
})
export class TaskDescriptionComponent implements AfterViewInit {
  @Input()
  control!: AbstractControl<any, any> | null;

  selectedTab: number = 0;  // 0 para Editar, 1 para Preview

  constructor(private sanitizer: DomSanitizer) { }

  getFormControl() {
    return this.control as FormControl;
  }

  getSanitizedHtml(content: string): string | null {
    return this.sanitizer.sanitize(SecurityContext.HTML, content);
  }

  ngAfterViewInit() {
    // Verifica se há valor no campo e altera a tab inicial
    if (this.getFormControl()?.value) {
      this.selectedTab = 1;  // Se houver valor, o Preview é ativado
    } else {
      this.selectedTab = 0;  // Caso contrário, o Editar é ativado
    }
  }
}