export function downloadFile(blob: Blob, name: string) {
  const downloadURL = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = downloadURL;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(downloadURL);
}
