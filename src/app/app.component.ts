import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerformanceService } from './services/performance.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    results: any[] = [];
    url = '';

    constructor(private performanceService: PerformanceService) { }

    ngOnInit() {
        this.getResults();
    }

    getResults() {
        this.performanceService.getResults().subscribe(data => this.results = data);
    }

    analyze() {
        this.performanceService.analyzeWebsite(this.url).subscribe(() => {
            this.url = '';
            this.getResults();
        });
    }
}