import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/user-profile', title: 'Globales',  icon:'person', class: '' },
    { path: '/dashboard', title: 'Carreras',  icon: 'dashboard', class: '' },
    { path: '/table-list', title: 'Alumnos',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Personal',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Externos',  icon:'bubble_chart', class: '' },
   //  { path: '/notifications', title: 'Libros',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Prestamo',  icon:'unarchive', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
