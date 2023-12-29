export function message(type: string, content: unknown) {
  return { event: type, detail: content };
}
