import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: 'appDropDown'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.el.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  constructor(private el: ElementRef) { }

}
