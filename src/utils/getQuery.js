// query应该在hash后面
export default function getQuery() {
  // get url
  let url = window.location.href;

  // result queryObject
  let query = {};

  // remove hash
  let search = url.split('/#/');
  if (search != -1 && Array.isArray(search) && search.length > 1) {
      url = search[1];
  }

  // get queryString
  const queryString = Array.isArray(url.split('?')) 
    && url.split('?').length > 1 
    && url.split('?')[1] || '';

  // get queryObject and remove undefined
  queryString.split('&').forEach(item => {
    const key = item.split('=')[0];
    const value = item.split('=')[1];
    if (value) {
      query[key] = value;
    }
  });

  return query;
}