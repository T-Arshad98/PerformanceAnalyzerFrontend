import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerformanceService } from './services/performance.service';
import { PerformanceResult } from './shared/models/performance-result';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    results: any[] = [];
    url = '';
    latestResult: PerformanceResult | null = null;

    constructor(private performanceService: PerformanceService) { }

    ngOnInit() {
        this.getResults();
    }

    getResults() {
        this.performanceService.getResults().subscribe({
            next: (data) => this.results = data,
            error: (err) => console.error('Error fetching results:', err)
        });
    }
    analyze() {
        this.performanceService.analyzeWebsite(this.url).subscribe({
            next: (result) => {
                this.latestResult = result; // Store latest result
                this.url = '';
                this.getResults(); // Refresh full list
            },
            error: (err) => console.error('Analyze error:', err)
        });
    }
}