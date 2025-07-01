import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';
import { Task } from '../models/task.model';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-tab1',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {
  tasks: Task[] = [];
  categories: Category[] = [];
  selectedCategory: string | null = null;
  newTaskTitle = '';

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    await this.taskService.load();
    await this.categoryService.load();
    this.categories = this.categoryService.getAll();
    this.filterTasks();
  }

  filterTasks() {
    if (this.selectedCategory) {
      this.tasks = this.taskService.getByCategory(this.selectedCategory);
    } else {
      this.tasks = this.taskService.getAll();
    }
  }

  async addTask() {
    if (!this.newTaskTitle.trim()) return;
    await this.taskService.add(
      this.newTaskTitle,
      this.selectedCategory || undefined
    );
    this.newTaskTitle = '';
    this.filterTasks();
  }

  async toggleComplete(task: Task) {
    await this.taskService.toggleComplete(task.id);
    this.filterTasks();
  }

  async removeTask(task: Task) {
    await this.taskService.remove(task.id);
    this.filterTasks();
  }

  onCategoryChange() {
    this.filterTasks();
  }

  getCategoryName(categoryId: string | undefined): string {
    if (!categoryId) return '';
    const cat = this.categories.find((c) => c.id === categoryId);
    return cat ? cat.name : '';
  }
}
