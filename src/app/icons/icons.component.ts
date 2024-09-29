import { Component } from '@angular/core';
import { Iicon } from '../modals/Iicon';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.scss',
})
export class IconsComponent {
  icons: Iicon[] = [
    {
      no: 1,
      iconTitle: 'Building',
      iconPath: 'assets/images/building.png',
    },
    {
      no: 2,
      iconTitle: 'Cloud',
      iconPath: 'assets/images/cloud-network.png',
    },
    {
      no: 3,
      iconTitle: 'Idea',
      iconPath: 'assets/images/idea.png',
    },
    {
      no: 4,
      iconTitle: 'Laptop',
      iconPath: 'assets/images/laptop.png',
    },
    {
      no: 5,
      iconTitle: 'Like',
      iconPath: 'assets/images/like.png',
    },
    {
      no: 6,
      iconTitle: 'Line-Chart',
      iconPath: 'assets/images/line-chart.png',
    },
    {
      no: 7,
      iconTitle: 'Meteor-Rain',
      iconPath: 'assets/images/meteor-rain.png',
    },
    {
      no: 8,
      iconTitle: 'Money-Bag',
      iconPath: 'assets/images/money-bag.png',
    },
    {
      no: 9,
      iconTitle: 'MortarBoard',
      iconPath: 'assets/images/mortarboard.png',
    },
    {
      no: 10,
      iconTitle: 'NoteBook',
      iconPath: 'assets/images/notebook.png',
    },
    {
      no: 11,
      iconTitle: 'Presentation',
      iconPath: 'assets/images/presentation.png',
    },
    {
      no: 12,
      iconTitle: 'Search',
      iconPath: 'assets/images/search.png',
    },
    {
      no: 13,
      iconTitle: 'Shopping-Cart',
      iconPath: 'assets/images/shopping-cart.png',
    },
    {
      no: 14,
      iconTitle: 'Video',
      iconPath: 'assets/images/Video.png',
    },
    {
      no: 15,
      iconTitle: 'Worckplace',
      iconPath: 'assets/images/workplace.png',
    },
  ];
}
