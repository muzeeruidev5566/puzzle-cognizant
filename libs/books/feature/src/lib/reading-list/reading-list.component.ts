import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  public readingList$ = this._store.select(getReadingList);

  constructor(private readonly _store: Store) {}

  public removeFromReadingList(item) {
    this._store.dispatch(removeFromReadingList({ item }));
  }
}
