import { Media } from "./Media";

export class Cd extends Media {
  private artistValue: string;
  private songsValue: string[];

  constructor(artist: string, title: string, songs: string[]) {
    super(title);
    this.artistValue = artist;
    this.songsValue = songs;
  }
  get artist(): string {
    return this.artistValue;
  }
  get songs(): string[] {
    return this.songsValue;
  }
}
