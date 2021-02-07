import { LatLng } from '../lat-lng/lat-lng';

export class Venue {
  category: string;
  name: string;
  stars: number;
  tags = new Array<string>();
  imageUrl: string;
  description: string;
  address: string;
  phoneNumber: string;
  distanceAway: number;


  constructor(
    category: string,
    name: string,
    stars: number,
    tags: [],
    imageUrl: string,
    description: string,
    address: string,
    phoneNumber: string,
    distanceAway: number
  ) {
    this.category = category;
    this.name = name;
    this.stars = stars;
    this.tags = tags;
    this.imageUrl = imageUrl;
    this.description = description;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.distanceAway = distanceAway;
  };
}
