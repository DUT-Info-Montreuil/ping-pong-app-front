import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [NgIf],
  templateUrl: './response.component.html',
  styleUrl: './response.component.css'
})
export class ResponseComponent {

  message: string|undefined = undefined;

  constructor(private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      const data = params['message'];
      this.message = data;
    });
  }

}
