import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private jsonUrl = 'assets/general.json'; // 从 assets 读取

  constructor(private http: HttpClient) {}

  getProjectData(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
}
