import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  private endpoint = 'users/all';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.get(this.endpoint).subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Error fetching users', err)
    });
  }

  navigateToAdd(): void {
    this.router.navigate(['/user/add']);
  }

  navigateToEdit(id: number): void {
    this.router.navigate([`/user/edit/${id}`]);
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.delete(this.endpoint, id).subscribe({
        next: () => {
          alert('User deleted successfully!');
          this.loadUsers();
        },
        error: (err) => alert('Error deleting user!')
      });
    }
  }
}
