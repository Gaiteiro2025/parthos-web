import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-template',
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule],
  standalone: true,
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateComponent {
  isExpanded = true;
  menuItems = [
    { label: 'Tarefas', icon: 'assignment', route: '/tasks' },
    /*{ label: 'Configurações', icon: 'settings', route: '/tasks' },
    { label: 'Conta', icon: 'account_circle', route: '/tasks' },*/
    { label: 'Sair', icon: 'logout', route: '/logout' }
  ];

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;

  }
}
