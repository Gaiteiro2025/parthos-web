import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@core/interfaces/user.interface';
import { firstValueFrom } from 'rxjs';
import { UserAuth } from '../../interfaces/user-auth.interface';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:3000/user-api/auth/';
  currentUser!: User;

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) { }

  async login(email: string, password: string): Promise<void> {
    try {
      const headers = new HttpHeaders();
      const response: any = await firstValueFrom(
        this.http.post(this.authUrl + 'login', { email, password }, { headers })
      );
      this.setToken(response.access_token);
      this.setUser(response.user);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Erro de autenticação:', error);
      this.notificationService.error('Erro ao realizar login. Por favor, tente novamente.', 'Erro de Autenticação');
      throw error;
    }
  }

  async register(userAuth: UserAuth): Promise<void> {
    try {
      const headers = new HttpHeaders();
      const response: any = await firstValueFrom(
        this.http.post(this.authUrl + 'register', userAuth, { headers })
      );
      this.setToken(response.access_token);
      this.setUser(response.user);
      this.router.navigate(['/'],);
    } catch (error) {
      console.error('Erro de autenticação:', error);
      this.notificationService.error('Erro ao realizar registro. Por favor, tente novamente.', 'Erro de Registro');
      throw error;
    }
  }
  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  setToken(token: string): void {
    sessionStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
