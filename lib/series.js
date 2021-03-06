import Promise from 'bluebird'

//
// This is used to run a list of promises in serial, *not* parallel
//
export default function (items, fn) {
  let p = Promise.resolve()
  const results = []

  items.forEach(item => {
    p = p.then(last => {
      if (last) results.push(last)
      return fn(item)
    })
  })

  return p.then(last => {
    if (last) results.push(last)
    return results
  })
}
