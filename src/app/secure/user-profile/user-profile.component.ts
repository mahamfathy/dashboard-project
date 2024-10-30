import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IProfile } from '../../shared/models/IProfile';
import { AuthService } from '../../shared/services/auth.service';
import { FormsService } from '../../shared/services/forms.service';
import { NotificationService } from '../../shared/services/notification.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  form = this.formsService.createProfileForm();
  profile: IProfile = {
    name: 'Chet Faker',
    username: '@chetfaker',
    imagePath: './assets/images/avatar2.jpg',
    backgroundImage: './assets/images/background.jpg',
    imageAlt: 'Avatar image',
    backgroundAlt: 'Background image',
    aboutMe: 'Add Bio',
  };
  selectedImagePath!: string | undefined;
  constructor(
    public authService: AuthService,
    private formsService: FormsService,
    private notificationService: NotificationService
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
    this.authService.profile$.subscribe((profile) => {
      this.profile = profile;
      this.form.patchValue({
        username: profile.username.slice(1),
        firstName: profile.name.split(' ')[0] || '',
        lastName: profile.name.split(' ')[1] || '',
        aboutMe: profile.aboutMe || '',
      });
    });
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImagePath = e.target.result;
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
      imagePath: this.selectedImagePath
        ? this.selectedImagePath
        : this.profile.imagePath,
    };
    this.authService.updateProfileData(updatedProfile);
    this.notificationService.addNotification({
      id: '',
      title: 'Profile Updated',
      time: new Date().toISOString(),
      read: false,
      icon: 'fa fa-user',
    });
    this.form.reset();
  }
}
