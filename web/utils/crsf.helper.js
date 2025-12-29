function csrfFetch(url, options = {}) {
  const token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

  return fetch(url, {
    credentials: "same-origin",
    ...options,
    headers: {
      "Content-Type": "application/json",
      "CSRF-Token": token,
      ...(options.headers || {})
    }
  });
}


module.exports = csrfFetch; 