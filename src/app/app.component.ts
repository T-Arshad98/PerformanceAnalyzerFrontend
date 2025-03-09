import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerformanceService } from './services/performance.service';
import { PerformanceResult } from './shared/models/performance-result';
import { CommonModule } from '@angular/common';
import { interval, switchMap, takeWhile } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
    results: PerformanceResult[] = [];
    url = '';
    latestResult: PerformanceResult | null = null;
    isLoading = true; // Track database availability
    loadingMessage = 'Waiting for database response...';
    errorMessage = ''; // Store error messages

    constructor(private performanceService: PerformanceService) { }

    ngOnInit() {
        this.pollDatabase();
    }

    pollDatabase() {
        interval(1000).pipe(
            switchMap(() => this.performanceService.getResults()),
            takeWhile((data, index) => {
                if (data) {
                    this.results = data;
                    this.isLoading = false;
                    this.loadingMessage = '';
                    return false;
                }
                this.loadingMessage = `Waiting for database response... (Attempt ${index + 1})`;
                return true;
            }, true)
        )
            .subscribe({
                error: (err) => {
                    this.errorMessage = err.message;
                    this.loadingMessage = 'Retrying...';
                }
            });
    }

    getResults() {
        this.performanceService.getResults().subscribe({
            next: (data) => {
                this.results = data;
                this.errorMessage = '';
            },
            error: (err) => this.errorMessage = err.message
        });
    }
    
    analyze() {
        this.errorMessage = '';
        this.performanceService.analyzeWebsite(this.url).subscribe({
            next: (result) => {
                this.latestResult = result;
                this.url = '';
                this.getResults();
            },
            error: (err) => this.errorMessage = err.message
        });
    }
}