import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,HttpClientModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-frontend';

  constructor(private httpClient: HttpClient) {}
  baseurl="http://localhost:8080/api/employees";
  employees:any;

  ngOnInit() {
    this.httpClient.get(this.baseurl).subscribe(response => {
      console.log(response);
      this.employees = response;
    });
  }
}
