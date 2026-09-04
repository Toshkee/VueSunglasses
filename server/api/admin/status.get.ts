export default defineEventHandler(async (event) => {
  assertDev(event)
  const status = await git(['status', '--porcelain'])
  const changes = status ? status.split('\n').filter(Boolean) : []
  let ahead = 0
  try {
    ahead = Number(await git(['rev-list', '--count', '@{u}..HEAD'])) || 0
  } catch {}
  return { changes, ahead }
})
