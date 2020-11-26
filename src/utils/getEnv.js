export default function getQuery() {
  const search = window.location.search.replace('?', '');
  const query = {};
  search.split('&').forEach(item => {
      const key = item.split('=')[0];
      const value = item.split('=')[1];
      query[key] = value;
  });
  return { env: query.env };
}