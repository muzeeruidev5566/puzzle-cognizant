import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  removeFromReadingList,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

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
    private readonly _fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  public get searchTerm(): string {
    return this.searchForm.value.term;
  }

  public ngOnInit(): void {
    this._store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
  }

  public formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  public addBookToReadingList(book: Book) {
    this._store.dispatch(addToReadingList({ book }));
    this._openSnackBar('Added to reading list',book);
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

  private _openSnackBar(message: string, book: Book) {
    let snackBarRef = this._snackBar.open(message, 'Undo', {
      duration: 3000
    });
    const deletedBook = {
      ...book,
      'bookId': book.id,
    }

    snackBarRef.onAction().subscribe(() => {
      this._removeFromReadingList(deletedBook);
    })
  }

  private _removeFromReadingList(item) {
    this._store.dispatch(removeFromReadingList({ item }));
  }
}
