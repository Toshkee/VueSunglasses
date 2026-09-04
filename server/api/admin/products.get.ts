export default defineEventHandler(async (event) => {
  assertDev(event)
  return readProducts()
})
