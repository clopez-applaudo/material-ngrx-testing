import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  unsubscribe$ = new Subject();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.synchToDo();
    this.store.dispatch(getToDoList());
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
}
