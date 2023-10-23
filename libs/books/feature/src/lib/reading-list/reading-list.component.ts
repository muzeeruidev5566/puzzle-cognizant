import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { Book, ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  public readingList$ = this._store.select(getReadingList);

  constructor(private readonly _store: Store, private _snackBar: MatSnackBar) {}

  public removeFromReadingList(item) {
    this._store.dispatch(removeFromReadingList({ item }));
    this._openSnackBar('Removed from reading list',item);
  }
  
  private _openSnackBar(message: string, item: any) {
    let snackBarRef = this._snackBar.open(message, 'Undo', {
      duration: 3000
    });
    const book: Book = {
      ...item,
      'id': item.bookId,
    }

    snackBarRef.onAction().subscribe(() => {
      this._store.dispatch(addToReadingList({ book }));
    })
  }
}
