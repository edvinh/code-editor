export function compile (code, lang) {
  return fetch(`/api/compile/${lang}`, {
    method: 'POST',
    'Content-Type': 'text/plain',
    body: code,
  })
}