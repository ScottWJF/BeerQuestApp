import { Injectable } from "@angular/core";
import { LatLng } from '../lat-lng/lat-lng';

@Injectable()
export class AppSettings {

  baseUrl = "https://datamillnorth.org/api/table/wk7xz_hf8bv?";

  tags = [
    "arcade games",
    "beer garden",
    "breakfast",
    "coffee",
    "dance floor",
    "darts",
    "food",
    "free wifi",
    "karaoke",
    "lgbt",
    "live music",
    "membership discount",
    "pool table",
    "quiz",
    "sofas",
    "sports",
    "sunday roasts"
  ];

  // X-labs Leeds Office
  defaultLatLng = new LatLng(53.80126312362281, - 1.5560542619628914);
}
