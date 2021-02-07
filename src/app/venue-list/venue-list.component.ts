import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { VenueService } from "../venue/venue.service";
import { Venue } from "../venue/venue";
import { AppSettings } from "../settings/app.settings";
import { LatLng } from "../lat-lng/lat-lng";

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class VenueListComponent implements OnInit {
  columnsToDisplay = ['category', 'name', 'excerpt', 'stars_value'];
  venues: Venue[];
  selectedStarRating = 0;
  selectedTags = new Array<string>();
  availableTags: string[];
  currentLatLng: LatLng;

  constructor(private readonly venueService: VenueService,
  private readonly appSettings: AppSettings) { }

  ngOnInit() {
    // Apply defaults
    this.availableTags = this.appSettings.tags;
    this.currentLatLng = this.appSettings.defaultLatLng

    this.venueService.getVenues(this.appSettings.defaultLatLng).subscribe(data => {
      this.venues = data;
    });
  }

  // Applies given filters
  applyFilters(): void {
    this.venueService.getVenues(this.currentLatLng, this.selectedStarRating, this.selectedTags).subscribe(data => {
      this.venues = data;
    });
  }

  // Adds given tag to selected array and removes it from available tags
  selectTag(tag: string): void {
    const index = this.availableTags.indexOf(tag);
    this.availableTags.splice(index, 1);

    this.selectedTags.push(tag);
  }

  // Removes given tag from selected array and allows it to be selected again
  removeTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    this.selectedTags.splice(index, 1);

    this.availableTags.push(tag);
  }
}
