import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IProfile } from '../../shared/models/IProfile';
import { AuthService } from '../../shared/services/auth.service';
import { FormsService } from '../../shared/services/forms.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  form = this.formsService.createProfileForm();

  profile: IProfile = {
    name: 'Chet Faker',
    username: '@chetfaker',
    imagePath: 'assets/images/avatar2.jpg',
    backgroundImage: './assets/images/background.jpg',
    imageAlt: 'Avatar image',
    backgroundAlt: 'Background image',
    aboutMe: 'Add Bio',
  };
  constructor(
    private authService: AuthService,
    private formsService: FormsService
  ) {
    this.authService.username$.subscribe((username) => {
      if (username) {
        this.profile.username = `@${username}`;
        this.profile.name = username;
      }
      this.authService.imagePath$.subscribe((imagePath) => {
        if (imagePath) this.profile.imagePath = imagePath;
      });
    });
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.authService.updateImagePath(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
  onUpdate(form: FormGroup): void {
    const formValue = form.value;
    const updatedProfile: IProfile = {
      ...this.profile,
      name: `${formValue.firstName ?? ''} ${formValue.lastName ?? ''}`.trim(),
      username: `@${formValue.username}`.trim(),
      aboutMe: formValue.aboutMe ?? '',
    };
    this.authService.updateProfileData(updatedProfile);
    this.form.reset();
  }
}
