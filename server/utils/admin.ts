import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import type { H3Event } from 'h3'

const exec = promisify(execFile)

export const ROOT = process.cwd()
export const PRODUCTS_FILE = join(ROOT, 'app', 'data', 'products.json')
export const IMAGES_DIR = join(ROOT, 'public', 'images', 'products')

/** Admin API postoji samo u dev modu (npm run dev). U produkciji je 404. */
export function assertDev(event: H3Event) {
  if (!import.meta.dev) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }
  // Dozvoli samo pozive sa iste mašine
  const host = getRequestHost(event)
  if (!/^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host)) {
    throw createError({ statusCode: 403, statusMessage: 'Admin radi samo lokalno' })
  }
}

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export async function readProducts(): Promise<any[]> {
  return JSON.parse(await readFile(PRODUCTS_FILE, 'utf8'))
}

export async function writeProducts(list: any[]) {
  await writeFile(PRODUCTS_FILE, JSON.stringify(list, null, 2) + '\n', 'utf8')
}

export async function git(args: string[]) {
  const { stdout, stderr } = await exec('git', args, { cwd: ROOT, maxBuffer: 1024 * 1024 })
  return (stdout + stderr).trim()
}
