export function read(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

export function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
