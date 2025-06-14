export default async function fetchWithAuth(url, options = {}) {
  let accessToken = localStorage.getItem('accessToken');
  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  console.log('AUTH JS status', res.status);
  if (res.status === 401 || res.status === 403) {
    console.warn('Access token expired, trying to refresh...');

    const refreshToken = localStorage.getItem('refreshToken');
    const refreshRes = await fetch('http://localhost:3000/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshRes.ok) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw new Error("Session expired. Please log in again.");
    }

    const data = await refreshRes.json();
    if (!data.accessToken) {
      throw new Error("Invalid refresh response");
    }

    const newAccessToken = data.accessToken;
    localStorage.setItem('accessToken', newAccessToken);

    console.log('Old token:', accessToken);
    console.log('New token:', newAccessToken);

    // Retry original request with new token
    res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  return res;
}
