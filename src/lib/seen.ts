// 레퍼런스 "봤음" 체크. 키는 파일 이름(slug)이라 순서를 바꾸거나 항목을 끼워 넣어도 유지된다.
const KEY = 'regula-refs-v2';

export function loadSeen(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

export function saveSeen(seen: Record<string, boolean>) {
  try {
    localStorage.setItem(KEY, JSON.stringify(seen));
  } catch {}
}
