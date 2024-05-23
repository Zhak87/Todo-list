import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css'],
})
export class TaskManagerComponent implements OnInit {
  tasks: any[] = [];
  newTaskText = '';
  currentTask: any = null;
  displayedColumns: string[] = ['task', 'actions'];

  constructor(
    private taskService: TaskService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('ru');
    this.translate.use('ru');
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  createTask(): void {
    if (this.newTaskText.trim()) {
      this.taskService.createTask({ text: this.newTaskText }).subscribe(() => {
        this.getTasks();
        this.newTaskText = '';
      });
    }
  }

  editTask(task: any): void {
    this.currentTask = { ...task };
  }

  updateTask(): void {
    if (this.currentTask && this.currentTask.text.trim()) {
      this.taskService
        .updateTask(this.currentTask.id, this.currentTask)
        .subscribe(() => {
          this.getTasks();
          this.cancelEdit();
        });
    }
  }

  cancelEdit(): void {
    this.currentTask = null;
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.getTasks();
    });
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
  }
}
