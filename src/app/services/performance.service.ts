import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerformanceResult } from '../shared/models/performance-result';

@Injectable({ providedIn: 'root' })
export class PerformanceService {
    private apiUrl = 'https://performanceanalyzerapi-dzacgmhzfgdjaxh6.canadacentral-01.azurewebsites.net/api/performance';

    constructor(private http: HttpClient) { }

    analyzeWebsite(url: string): Observable<PerformanceResult> {
        return this.http.post<PerformanceResult>(`${this.apiUrl}/analyze`, JSON.stringify(url), {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }

    getResults(): Observable<PerformanceResult[]> {
        return this.http.get<PerformanceResult[]>(this.apiUrl);
    }

}