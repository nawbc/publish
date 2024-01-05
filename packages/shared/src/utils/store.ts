export class LocalStore {
  static set<T extends object>(key: string, value: T) {
    const v = this.get(key);
    localStorage.setItem(
      key,
      JSON.stringify(v ? Object.assign({}, v, value) : value),
    );
  }

  static get<T extends object>(key: string): T {
    try {
      return JSON.parse(localStorage.getItem(key)!);
    } catch (error) {
      return {} as T;
    }
  }
}
