import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, retry } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private url = environment.apiUrl;

  constructor() {}

  create(name: string, surname: string, city: string, locality: string) {
    const urlComplete = this.url + 'users';
    const body = {
      name: name,
      surname: surname,
      city: city,
      locality: locality,
    };
    return firstValueFrom(this.http.post(urlComplete, body));
  }
}
