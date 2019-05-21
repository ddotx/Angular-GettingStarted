import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { MessageService } from './messages/message.service';


@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  pageTitle = 'Angular Product Management';
  loading = true;

  //TODO === use getter for messageService
  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  constructor(
    private router: Router,
    private messageService: MessageService //! ===> Cannot use messageService in template ==> Use a getter
    ){
    //! ==> Routes: Reacting to Events
    //* == Subscribe to the Router's events observable
    //* == Check the event type as needed
    this.router.events.subscribe((routerEvent: Event)=>{
      this.checkRouterEvent(routerEvent);
    })
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  displayMessages(): void {
    // Example of primary and secondary routing together
    // this.router.navigate(['/login', {outlets: { popup: ['messages']}}]); // Does not work
    // this.router.navigate([{outlets: { primary: ['login'], popup: ['messages']}}]); // Works
    this.router.navigate([{ outlets: { popup: ['messages'] } }]); // Works
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.messageService.isDisplayed = false;
  }
}
