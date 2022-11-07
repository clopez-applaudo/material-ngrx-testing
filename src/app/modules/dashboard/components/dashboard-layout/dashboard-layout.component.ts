import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/modules/core/store/app.store';
import { ToDo } from '../../models/todo.model';
import { getToDoList, updateToDo } from '../../store/dashboard.actions';
import { toDoList } from '../../store/dashboard.selectors';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  toDoList!: ToDo[];
  loadingIds: Number[] = [];
  searchInput = new FormControl();
  unsubscribe$ = new Subject();
  currentAppId!: number;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.synchToDo();
    this.store.dispatch(getToDoList());
    this.filter();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  synchToDo(): void {
    this.store
      .pipe(select(toDoList), takeUntil(this.unsubscribe$))
      .subscribe((list) => {
        this.toDoList = list;
        this.loadingIds = [];
      });
  }

  updateToDo(id: number, status: boolean): void {
    this.loadingIds.push(id);
    this.store.dispatch(updateToDo({ id, completed: !status }));
  }

  private filter(): void {
    this.searchInput.valueChanges.pipe(
      debounceTime(700),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
    )
    .subscribe((response) => {
      if(this.currentAppId) {
        if ((response as string).length == 0) {
          this.clearFilter();
          console.log('No search word');
        } else {
          console.log('Search is triggered', response);
        }
      }
    })
  }

  private clearFilter(): void {
    this.filterRequestTable();
    this.searchInput.setValue('');
  }

  private filterRequestTable(): void {
    this.searchInput.setValue('');
  }
}
