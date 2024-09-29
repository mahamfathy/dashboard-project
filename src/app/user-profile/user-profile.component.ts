import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  profile = {
    name: 'Chet Faker',
    username: '@chetfaker',
    imagePath: 'assets/images/avatar2.jpg',
    backgroundImage: './assets/images/background.jpg',
    imageAlt: 'Avatar image',
    backgroundAlt: 'Background image',
  };
}
