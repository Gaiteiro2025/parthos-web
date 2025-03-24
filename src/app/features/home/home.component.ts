import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplateComponent } from 'src/app/shared/template/template.component';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, TemplateComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }
