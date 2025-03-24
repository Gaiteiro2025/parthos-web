import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormInput } from '@core/interfaces/form-input.interface';
import { ToastrModule } from 'ngx-toastr';
import { FormInputComponent } from 'src/app/shared/form-input/form-input.component';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormInputComponent, RouterModule, ToastrModule],
  providers: [
    provideAnimations()
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSnowing: boolean = true;
  currentTime: Date = new Date();
  errorMessage: string = '';

  formIputLogin: FormInput[] = [
    {
      name: 'email',
      classGroup: 'input-group',
      class: "input-field", type: "text", placeholder: "email",
      textError: 'Por favor, insira um email válido.'
    },
    {
      name: 'password',
      classGroup: 'input-group', class: "input-field", type: "password", placeholder: "Senha", textError: 'A senha deve ter pelo menos 6 caracteres.'
    }
  ]
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.isSnowing = this.isDayTime() ? false : true;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() { }

  isDayTime(): boolean {
    const hours = this.currentTime.getHours();
    return hours >= 6 && hours < 18;
  }

  async onLogin(): Promise<void> {

    const t = this.loginForm.controls['email']
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.errorMessage = '';
      try {
        await this.authService.login(email, password);
      } catch (error) {
        this.errorMessage = 'Credenciais inválidas. Tente novamente.';
        console.error('Erro de autenticação:', error);
      }
    } else {
      this.errorMessage = 'Preencha os campos corretamente!';
    }
  }

  onForgotPassword() {
    alert('Recuperando sua senha...');
  }
}
