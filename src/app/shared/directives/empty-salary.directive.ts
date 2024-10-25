import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appEmptySalary]',
  standalone: true,
})
export class EmptySalaryDirective implements OnInit {
  @Input('appEmptySalary') salary!: number;
  constructor(private elementRef: ElementRef, private render: Renderer2) {}
  ngOnInit(): void {
    const isEmptySalary = this.salary > 0 ? this.salary : '---';
    this.render.setProperty(
      this.elementRef.nativeElement,
      'innerText',
      isEmptySalary
    );
  }
}
