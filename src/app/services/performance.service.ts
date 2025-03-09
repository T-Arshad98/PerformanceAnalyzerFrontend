import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { PerformanceResult } from '../shared/models/performance-result';

@Injectable({ providedIn: 'root' })
export class PerformanceService {
    private apiUrl = 'https://performanceanalyzerapi-dzacgmhzfgdjaxh6.canadacentral-01.azurewebsites.net/api/performance';

    constructor(private http: HttpClient) { }

    analyzeWebsite(url: string): Observable<PerformanceResult> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<PerformanceResult>(`${this.apiUrl}/analyze`, JSON.stringify(url), { headers }).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'Failed to analyze website';
                if (error.status === 0) errorMessage = 'Network error: Unable to reach the server';
                else if (error.status === 400) errorMessage = 'Invalid URL provided';
                else if (error.status === 500) errorMessage = 'Server error during analysis';
                return throwError(() => new Error(errorMessage));
            })
        );
    }

    getResults(): Observable<PerformanceResult[]> {
        return this.http.get<PerformanceResult[]>(this.apiUrl).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'Failed to fetch results';
                if (error.status === 0) errorMessage = 'Network error: Unable to reach the server';
                else if (error.status === 500) errorMessage = 'Server error fetching results';
                return throwError(() => new Error(errorMessage));
            })
        );
    }

}