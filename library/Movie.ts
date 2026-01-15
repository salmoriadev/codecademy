import { Media } from "./Media";

export class Movie extends Media {
  private directorValue: string;
  private runTimeValue: number;

  constructor(director: string, title: string, runTime: number) {
    super(title);
    this.directorValue = director;
    this.runTimeValue = runTime;
  }
  get director(): string {
    return this.directorValue;
  }
  get runTime(): number {
    return this.runTimeValue;
  }
}
