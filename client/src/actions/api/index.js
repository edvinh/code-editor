const ROOT_URL =
  process.env.NODE_ENV === 'production' ? process.env.SERVER_URL || 'http://192.168.1.2:3001' : ''

export function compile (code, lang, token) {
  return fetch(`${ROOT_URL}/api/compile/${lang}/${token}`, {
    method: 'POST',
    'Content-Type': 'text/plain',
    body: code,
  })
}

export function register (name) {
  return fetch(`${ROOT_URL}/api/team`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })
}

export function finishedBeer (token) {
  return fetch(`${ROOT_URL}/api/finishedbeer/${token}`)
}

export function listTeams () {
  return fetch(`${ROOT_URL}/api/team`)
}
