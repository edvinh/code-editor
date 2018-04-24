export function compile (code, lang, token) {
  console.log(`/api/compile/${lang}/${token}`)
  return fetch(`/api/compile/${lang}/${token}`, {
    method: 'POST',
    'Content-Type': 'text/plain',
    body: code,
  })
}

export function register (name) {
  return fetch('/api/team', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })
}
