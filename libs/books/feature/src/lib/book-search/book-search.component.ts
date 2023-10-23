import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { fromEvent, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  public books: ReadingListBook[];

  public searchForm = this._fb.group({
    term: ''
  });

  constructor(
    private readonly _store: Store,
    private readonly _fb: FormBuilder
  ) {}

  public get searchTerm(): string {
    return this.searchForm.value.term;
  }

  public ngOnInit(): void {
    this._store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
    this.onTypeSearch();
  }


  public formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  public addBookToReadingList(book: Book) {
    this._store.dispatch(addToReadingList({ book }));
  }

  public searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

 public  searchBooks() {
    if (this.searchForm.value.term) {
      this._store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this._store.dispatch(clearSearch());
    }
  }

  public onTypeSearch(): void {
    const inputChanges$ = this.searchForm.get('term').valueChanges
    inputChanges$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(val => {
          return of(this._store.dispatch(searchBooks(val)));
        })
      )
      .subscribe(console.log);
  }
}