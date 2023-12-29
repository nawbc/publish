export function download({
  name,
  content,
  type = 'text/plain',
}: {
  name: string;
  content: string;
  type?: string;
}) {
  const a = document.createElement('a');
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  a.setAttribute('display', 'none');
  a.setAttribute('download', name);
  a.setAttribute('href', url);
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
}
