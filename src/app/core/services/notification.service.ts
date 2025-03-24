import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor(private toastr: ToastrService) { }

    success(message: string, title: string = 'Sucesso') {
        this.toastr.success(message, title);
    }

    error(message: string, title: string = 'Erro') {
        this.toastr.error(message, title);
    }

    info(message: string, title: string = 'Informação') {
        this.toastr.info(message, title);
    }

    warning(message: string, title: string = 'Aviso') {
        this.toastr.warning(message, title);
    }
}
