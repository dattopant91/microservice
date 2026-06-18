import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.css'
})
export class AddEditUserComponent
{

  // user = { username: '', password: '', role: 'USER' };
  user = {
    username: '',
    password: '',
    role: 'USER',
    fullName: '',
    email: '',
    department: 'IT Department',
    salary: 0
  };
  userId!: number;
  isEditMode = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void
  {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam)
    {
      this.userId = +idParam;
      this.isEditMode = true;

      this.authService.get('users', this.userId).subscribe({
        next: (data) => this.user = data,
        error: (err) => alert('User not found!')
      });
    }
  }

  saveUser(): void
  {
    if (this.isEditMode)
    {
      this.authService.put('users/update', this.userId, this.user).subscribe({
        next: () =>
        {
          alert('User updated successfully!');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => alert('Failed to update user!')
      });
    } else
    {
      this.authService.post('users/add', this.user).subscribe({
        next: () =>
        {
          alert('User added successfully!');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => alert('Failed to add user!')
      });
    }
  }
}
