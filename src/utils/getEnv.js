import getQuery from './getQuery';

export default function getEnv() {
  const search = window.location.search.replace('?', '');
  const _env_info = {};
  search.split('&').forEach(item => {
      const key = item.split('=')[0];
      const value = item.split('=')[1];
      _env_info[key] = value;
  });

  const query = getQuery();
  if (Number(query.use_env_tag) === 1) {
    return { env: _env_info.env || query.env };
  }
  return {};
}