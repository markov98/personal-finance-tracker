import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  standalone: false,
})
export class ErrorComponent implements OnInit {
  errorMsg = '';
  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.errorService.apiError$.subscribe((err: any) => {
      this.errorMsg = err.error?.error || 'An unexpected error occurred';
    });
  }
}