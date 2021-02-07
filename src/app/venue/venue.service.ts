import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Venue } from "./venue";
import { map } from "rxjs/operators";
import { AppSettings } from "../settings/app.settings";
import { LatLng } from '../lat-lng/lat-lng';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VenueService {

  constructor(private readonly http: HttpClient,
  private readonly appSettings: AppSettings) { }

  // Get venues sorted by location (as the crow flies) in km
  // Optional filters for star rating and tags
  getVenues(currentLocation: LatLng, stars?: number, tags?: string[] ): Observable<Venue[]> {
    let sql = "sql= SELECT * FROM dataset WHERE category != 'Closed venues'";
    if (stars) {
      sql += " AND stars_value >= " + stars;
    }

    if (tags) {
      sql = this.applyTags(sql, tags);
    }
    return this.http.get<any>(this.appSettings.baseUrl + sql).pipe(map(data => {
      let venues = new Array<Venue>();
      data.rows.forEach(row => {
        venues.push(new Venue(row.category, row.name, row.stars_value, row.tags.split(","),
          row.thumbnail, row.excerpt, row.address, row.phone,
          this.getDistanceFromLatLonInKm(row.lat, row.lng, currentLocation.lat, currentLocation.lng)));
      });

      let sortedVenues: Venue[] = venues.sort((venue1, venue2) => venue1.distanceAway - venue2.distanceAway);
      return sortedVenues;
    }));
  }

  // Adds filters for each tag supplied
  applyTags(sql: string, tags: string[]): string {
    tags.forEach(tag => {
      sql += " AND tags LIKE '%25" + tag + "%25'";
    })
    return sql;
  }

  // 3rd party code taken from
  // https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
  // as ordinarily I'd prefer to do this in a backend endpoint

  getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    let R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    let dLon = this.deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    console.log(d);
    return d;
  }

  deg2rad(deg): number {
    return deg * (Math.PI / 180)
  }
}
