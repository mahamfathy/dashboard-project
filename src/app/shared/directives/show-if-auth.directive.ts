import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Directive({
  selector: '[showIfAuth]',
  standalone: true,
})
export class ShowIfAuthDirective {
  // @Input() set showIfAuth(condition: boolean) {
  //   const token = this.localStorageService.getItem('token');
  //   if (token && condition) {
  //     this.viewContainerRef.createEmbeddedView(this.templateRef);
  //   } else {
  //     this.viewContainerRef.clear();
  //   }
  // }
  private hasView = false;
  constructor(
    private templateRef: TemplateRef<HTMLElement>,
    private viewContainerRef: ViewContainerRef,
    private localStorageService: LocalStorageService
  ) {
    this.localStorageService.token$.subscribe((token) =>
      this.updateView(token)
    );
  }
  private updateView(token: string | null) {
    if (token && !this.hasView) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!token && this.hasView) {
      this.viewContainerRef.clear();
      this.hasView = false;
    }
  }
}
