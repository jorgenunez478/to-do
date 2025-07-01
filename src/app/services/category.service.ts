import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { StorageService } from './storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private categories: Category[] = [];
  private readonly STORAGE_KEY = 'categories';

  constructor(private storage: StorageService) {
    this.load();
  }

  async load() {
    const data = await this.storage.get<Category[]>(this.STORAGE_KEY);
    this.categories = data || [];
  }

  getAll(): Category[] {
    return this.categories;
  }

  async add(name: string, color?: string) {
    const category: Category = { id: uuidv4(), name, color };
    this.categories.push(category);
    await this.save();
  }

  async update(id: string, name: string, color?: string) {
    const cat = this.categories.find(c => c.id === id);
    if (cat) {
      cat.name = name;
      cat.color = color;
      await this.save();
    }
  }

  async remove(id: string) {
    this.categories = this.categories.filter(c => c.id !== id);
    await this.save();
  }

  private async save() {
    await this.storage.set(this.STORAGE_KEY, this.categories);
  }
}