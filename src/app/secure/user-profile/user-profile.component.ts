import { Component } from '@angular/core';
import { IProfile } from '../../shared/models/IProfile';
import { AuthService } from '../../shared/services/auth.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  profile: IProfile = {
    name: 'Chet Faker',
    username: '@chetfaker',
    imagePath: 'assets/images/avatar2.jpg',
    backgroundImage: './assets/images/background.jpg',
    imageAlt: 'Avatar image',
    backgroundAlt: 'Background image',
  };
  constructor(private authService: AuthService) {
    this.authService.username$.subscribe((username) => {
      if (username) {
        this.profile.name = username;
      }
      this.authService.imagePath$.subscribe((imagePath) => {
        if (imagePath) this.profile.imagePath = imagePath;
      });
    });
  }
}
