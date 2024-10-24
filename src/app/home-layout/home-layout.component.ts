import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    RouterOutlet,
    PageNotFoundComponent,
  ],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss',
})
export class HomeLayoutComponent {
  welcome = 'Welcome';
  constructor(private router: Router) {}
  isPageNotFound(): boolean {
    return this.router.url === '/404' || this.router.url === '/pageNotFound';
  }
}
