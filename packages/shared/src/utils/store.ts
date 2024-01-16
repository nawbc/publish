export class LocalStore {
  static set<T extends object>(key: string, value: T) {
    const v = this.get(key);
    localStorage.setItem(
      key,
      JSON.stringify(v ? Object.assign({}, v, value) : value),
    );
  }

  static get<T extends object>(
    key: string,
    fallback?: Record<string, unknown>,
  ): T {
    try {
      return JSON.parse(localStorage.getItem(key)!) ?? ((fallback ?? {}) as T);
    } catch (error) {
      return {} as T;
    }
  }
}
