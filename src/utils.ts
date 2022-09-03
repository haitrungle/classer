export const range = (start: number, stop: number, step: number = 1) => {
  let result = []
  for (let i = start; i < stop; i += step) {
    result.push(i)
  }
  return result
}
