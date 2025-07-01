import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  categories: Category[] = [];
  newCategoryName = '';
  editCategoryId: string | null = null;
  editCategoryName = '';

  constructor(private categoryService: CategoryService) {}

  async ngOnInit() {
    await this.loadCategories();
  }

  async loadCategories() {
    await this.categoryService.load();
    this.categories = this.categoryService.getAll();
  }

  async addCategory() {
    if (!this.newCategoryName.trim()) return;
    await this.categoryService.add(this.newCategoryName);
    this.newCategoryName = '';
    this.loadCategories();
  }

  async removeCategory(category: Category) {
    await this.categoryService.remove(category.id);
    this.loadCategories();
  }

  startEdit(cat: Category) {
    this.editCategoryId = cat.id;
    this.editCategoryName = cat.name;
  }

  cancelEdit() {
    this.editCategoryId = null;
    this.editCategoryName = '';
  }

  async saveEdit(cat: Category) {
    if (!this.editCategoryName.trim()) return;
    await this.categoryService.update(cat.id, this.editCategoryName);
    this.editCategoryId = null;
    this.editCategoryName = '';
    this.loadCategories();
  }
}
