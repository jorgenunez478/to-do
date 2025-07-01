import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { StorageService } from './storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [];
  private readonly STORAGE_KEY = 'tasks';

  constructor(private storage: StorageService) {
    this.load();
  }

  async load() {
    const data = await this.storage.get<Task[]>(this.STORAGE_KEY);
    this.tasks = data || [];
  }

  getAll(): Task[] {
    return this.tasks;
  }

  getByCategory(categoryId: string): Task[] {
    return this.tasks.filter(t => t.categoryId === categoryId);
  }

  async add(title: string, categoryId?: string) {
    const task: Task = { id: uuidv4(), title, completed: false, categoryId };
    this.tasks.push(task);
    await this.save();
  }

  async toggleComplete(id: string) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      await this.save();
    }
  }

  async remove(id: string) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    await this.save();
  }

  private async save() {
    await this.storage.set(this.STORAGE_KEY, this.tasks);
  }
}