import { Media } from "./Media";

export class Book extends Media {
  private authorValue: string;
  private pagesValue: number;

  constructor(author: string, title: string, pages: number) {
    super(title);
    this.authorValue = author;
    this.pagesValue = pages;
  }
  get author(): string {
    return this.authorValue;
  }
  get pages(): number {
    return this.pagesValue;
  }
}
