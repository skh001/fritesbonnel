export function prettifyTitle(pathOrKey) {
  const name = pathOrKey.replace(/^.*[\\/]/, '').replace(/\.[^/.]+$/, '');
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export function importAll(r) {
  return r.keys().map((key) => {
    const imported = r(key);
    const url = (imported && imported.default) ? imported.default : imported;
    return {
      title: prettifyTitle(key),
      url,
    };
  });
}
