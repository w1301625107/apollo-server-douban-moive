export function mergeResolvers(a, b) {
  const all = { ...a }
  Object.keys(b).forEach(key => {
    if (a[key] == undefined) {
      all[key] = b[key]
    } else {
      all[key] = { ...all[key], ...b[key] }
    }
  })
  return all
}
