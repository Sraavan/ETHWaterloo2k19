import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  BaseUrl = 'http://localhost:3000/';
  ServerStaticPageBaseUrl = 'http://localhost:3000/public/';
  ApiBaseUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  public TakeASnapshot() {
    const url = this.ApiBaseUrl + 'GetImage';
    return this.http.get(url).pipe(
      catchError((e, r) => {
        return of('Failed to get image');
      })
    );
  }

  public LoadLoginPage() {
    const url = this.ServerStaticPageBaseUrl + 'Dashboard';
    document.location.href = url;
  }
}
