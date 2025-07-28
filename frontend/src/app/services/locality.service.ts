import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocalityService {
  constructor() {}

  private http = inject(HttpClient);
  private url = environment.apiUrl;

  getAll(depto: string) {
    const urlComplete = this.url + 'locality/' + depto;
    return firstValueFrom(this.http.get(urlComplete));
  }
}
