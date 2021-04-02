import { Component, OnInit } from '@angular/core';
import { ToDo } from '../../models/todo.model';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {
  toDoList!: ToDo[];
  loadingIds: Number[] = [];

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.loadToDo();
  }

  loadToDo(): void {
    this.service.getTodos().subscribe((list) => (this.toDoList = list));
  }

  updateToDo(id: number, status: boolean): void {
    this.loadingIds.push(id);
    this.service.udpateTodo(id, !status).subscribe((res) => {
      if (res.completed !== undefined) {
        this.updateToDoList(id, res.completed);
      }
      const todoIndex = this.loadingIds.findIndex((id) => id === id);
      this.loadingIds.splice(todoIndex, 1);
    });
  }

  updateToDoList(id: number, status: boolean): void {
    this.toDoList = this.toDoList.map((toDo) => {
      if (toDo.id === id) {
        return {
          ...toDo,
          completed: status,
        };
      } else {
        return toDo;
      }
    });
  }
}
