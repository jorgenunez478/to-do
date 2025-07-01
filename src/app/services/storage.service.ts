import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  async set(key: string, value: any): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  async get<T>(key: string): Promise<T | null> {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}