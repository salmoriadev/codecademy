export class Media {
  private titleValue: string;
  private isCheckedOutValue: boolean;
  private ratingsValue: number[];

  constructor(title: string) {
    this.titleValue = title;
    this.isCheckedOutValue = false;
    this.ratingsValue = [];
  }
  get title(): string {
    return this.titleValue;
  }
  get isCheckedOut(): boolean {
    return this.isCheckedOutValue;
  }
  get ratings(): number[] {
    return this.ratingsValue;
  }
  set isCheckedOut(isCheckedOutNew: boolean) {
    this.isCheckedOutValue = isCheckedOutNew;
  }
  getAverageRating(): number {
    const ratingsSum = this.ratingsValue.reduce(
      (currentSum, rating) => currentSum + rating,
      0,
    );
    return ratingsSum;
  }
  toggleCheckOutStatus(): void {
    this.isCheckedOutValue = !this.isCheckedOutValue;
  }
  addRating(newRating: number): void {
    this.ratingsValue.push(newRating);
  }
}
