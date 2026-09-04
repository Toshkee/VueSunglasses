<script setup lang="ts">
import type { Product } from '~/data/labels'
import { shapeLabels, genderLabels } from '~/data/labels'

definePageMeta({ layout: 'admin' })
useSeoMeta({ title: 'Admin', robots: 'noindex' })

// ---------- Podaci ----------
const { data: initial, error: loadError } = await useFetch<Product[]>('/api/admin/products')
const list = ref<Product[]>(structuredClone(toRaw(initial.value ?? [])))
const savedSnapshot = ref(JSON.stringify(list.value))
const dirty = computed(() => JSON.stringify(list.value) !== savedSnapshot.value)

const selectedSlug = ref<string | null>(null)
const selected = computed(() => list.value.find(p => p.slug === selectedSlug.value) ?? null)
const isNew = ref(false)

const toast = ref<{ text: string; kind: 'ok' | 'err' } | null>(null)
let toastTimer: ReturnType<typeof setTimeout> | undefined
function notify(text: string, kind: 'ok' | 'err' = 'ok') {
  toast.value = { text, kind }
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.value = null), kind === 'ok' ? 3000 : 6000)
}

// Kad se products.json promijeni, Vite (dev server) uradi reload cijele strane.
// Zato izabrani model i poruku čuvamo u sessionStorage i vraćamo ih poslije reload-a.
const SS_SELECTED = 'admin:selected'
const SS_TOAST = 'admin:toast'
function remember(text: string) {
  try {
    sessionStorage.setItem(SS_SELECTED, selectedSlug.value ?? '')
    sessionStorage.setItem(SS_TOAST, text)
  } catch {}
}
onMounted(() => {
  try {
    const slug = sessionStorage.getItem(SS_SELECTED)
    const msg = sessionStorage.getItem(SS_TOAST)
    sessionStorage.removeItem(SS_SELECTED)
    sessionStorage.removeItem(SS_TOAST)
    if (slug && list.value.some(p => p.slug === slug)) selectedSlug.value = slug
    if (msg) notify(msg)
  } catch {}
})
function errText(e: any) {
  return e?.data?.statusMessage || e?.statusMessage || e?.message || String(e)
}

// ---------- Git status ----------
const status = ref<{ changes: string[]; ahead: number }>({ changes: [], ahead: 0 })
async function refreshStatus() {
  try { status.value = await $fetch('/api/admin/status') } catch {}
}
onMounted(refreshStatus)
const unpublished = computed(() => status.value.changes.length + status.value.ahead)

// ---------- Novi / izbor ----------
function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[čć]/g, 'c').replace(/š/g, 's').replace(/ž/g, 'z').replace(/đ/g, 'dj')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function addNew() {
  const p: Product = {
    slug: '',
    name: '',
    brand: 'Vue',
    price: 20,
    gender: 'unisex',
    shape: 'wayfarer',
    frameColor: '',
    lensColor: '',
    polarized: false,
    uv400: true,
    inStock: true,
    featured: false,
    images: [],
    description: '',
  }
  list.value.unshift(p)
  selectedSlug.value = ''
  isNew.value = true
}

function select(p: Product) {
  // Ako je nedovršen novi model bez slug-a, izbaci ga
  if (isNew.value && list.value[0]?.slug === '' && p !== list.value[0]) list.value.shift()
  isNew.value = false
  selectedSlug.value = p.slug
}

watch(() => selected.value?.name, (name) => {
  if (isNew.value && selected.value && name != null) {
    const s = slugify(name)
    // slug prazan model je na indexu 0; ažuriraj mu slug i selekciju
    selected.value.slug = s
    selectedSlug.value = s
  }
})

function move(i: number, dir: -1 | 1) {
  const j = i + dir
  if (j < 0 || j >= list.value.length) return
  const arr = list.value
  ;[arr[i], arr[j]] = [arr[j]!, arr[i]!]
}

const confirmDelete = ref(false)
function remove() {
  if (!selected.value) return
  list.value = list.value.filter(p => p !== selected.value)
  selectedSlug.value = null
  isNew.value = false
  confirmDelete.value = false
}

// ---------- Slike ----------
const uploading = ref(false)
async function onFiles(e: Event) {
  const input = e.target as HTMLInputElement
  const files = Array.from(input.files ?? [])
  input.value = ''
  if (!files.length || !selected.value) return
  if (!selected.value.slug) return notify('Prvo upiši ime modela (slug se pravi od imena).', 'err')

  const fd = new FormData()
  fd.append('slug', selected.value.slug)
  files.forEach(f => fd.append('files', f))
  uploading.value = true
  try {
    const res = await $fetch<{ images: string[] }>('/api/admin/upload', { method: 'POST', body: fd })
    selected.value.images.push(...res.images)
    notify(`Dodato ${res.images.length} ${res.images.length === 1 ? 'slika' : 'slike'}. Ne zaboravi „Sačuvaj“.`)
  } catch (err) {
    notify(errText(err), 'err')
  } finally {
    uploading.value = false
  }
}

async function removeImage(i: number) {
  if (!selected.value) return
  const [path] = selected.value.images.splice(i, 1)
  try {
    await $fetch('/api/admin/image', { method: 'DELETE', body: { path } })
  } catch (err) {
    notify(errText(err), 'err')
  }
}

function moveImage(i: number, dir: -1 | 1) {
  if (!selected.value) return
  const j = i + dir
  const arr = selected.value.images
  if (j < 0 || j >= arr.length) return
  ;[arr[i], arr[j]] = [arr[j]!, arr[i]!]
}

// ---------- Sačuvaj / Objavi ----------
const saving = ref(false)
async function save() {
  saving.value = true
  try {
    const msg = `Sačuvano. Sajt lokalno već prikazuje izmjene.`
    remember(msg)
    await $fetch('/api/admin/products', { method: 'PUT', body: list.value })
    savedSnapshot.value = JSON.stringify(list.value)
    isNew.value = false
    notify(msg)
    await refreshStatus()
  } catch (err) {
    try { sessionStorage.removeItem(SS_SELECTED); sessionStorage.removeItem(SS_TOAST) } catch {}
    notify(errText(err), 'err')
  } finally {
    saving.value = false
  }
}

const publishing = ref(false)
const publishLog = ref('')
async function publish() {
  if (dirty.value) return notify('Prvo sačuvaj izmjene.', 'err')
  publishing.value = true
  publishLog.value = ''
  try {
    const res = await $fetch<{ log: string }>('/api/admin/publish', { method: 'POST', body: {} })
    publishLog.value = res.log
    notify('Objavljeno na GitHub. Hosting će za par minuta izbaciti novu verziju sajta.')
    await refreshStatus()
  } catch (err: any) {
    publishLog.value = err?.data?.data || ''
    notify(errText(err), 'err')
  } finally {
    publishing.value = false
  }
}

// Upozori ako zatvara stranicu sa nesačuvanim izmjenama
onMounted(() => {
  window.addEventListener('beforeunload', (e) => {
    if (dirty.value) { e.preventDefault(); e.returnValue = '' }
  })
})

const input = 'w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm focus:border-ink-900 focus:outline-none'
const label = 'block text-xs font-semibold uppercase tracking-wider text-ink-600 mb-1'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <!-- Top bar -->
    <header class="sticky top-0 z-30 border-b border-ink-900/10 bg-white">
      <div class="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
        <NuxtLink to="/" class="flex items-center gap-2">
          <LogoMark class="h-6 w-auto" />
          <span class="font-display text-lg font-semibold">Admin</span>
        </NuxtLink>
        <span class="rounded-full bg-sand-200 px-2.5 py-0.5 text-xs font-medium">samo lokalno</span>

        <div class="ml-auto flex flex-wrap items-center gap-2">
          <span v-if="dirty" class="text-xs font-medium text-amber-600">Nesačuvane izmjene</span>
          <span v-else-if="unpublished" class="text-xs font-medium text-ink-600">{{ unpublished }} {{ unpublished === 1 ? 'izmjena čeka' : 'izmjena čekaju' }} objavu</span>
          <span v-else class="text-xs font-medium text-green-700">Sve objavljeno</span>

          <button class="btn-secondary !py-2" :disabled="!dirty || saving" :class="{ 'opacity-50': !dirty || saving }" @click="save">
            {{ saving ? 'Čuvam…' : 'Sačuvaj' }}
          </button>
          <button class="btn-primary !py-2" :disabled="dirty || publishing || !unpublished" :class="{ 'opacity-50': dirty || publishing || !unpublished }" @click="publish">
            {{ publishing ? 'Objavljujem…' : 'Objavi na sajt' }}
          </button>
          <NuxtLink to="/naocare" target="_blank" class="text-sm text-ink-600 underline underline-offset-4 hover:text-ink-900">Pogledaj sajt</NuxtLink>
        </div>
      </div>
    </header>

    <div v-if="loadError" class="mx-auto mt-16 max-w-lg rounded-2xl bg-white p-8 text-center shadow">
      <p class="font-display text-xl font-semibold">Admin nije dostupan</p>
      <p class="mt-2 text-sm text-ink-600">Radi samo lokalno dok je pokrenut <code>npm run dev</code>. ({{ errText(loadError) }})</p>
    </div>

    <div v-else class="mx-auto grid w-full max-w-7xl flex-1 gap-6 px-4 py-6 lg:grid-cols-[340px_1fr]">
      <!-- Lista -->
      <aside class="space-y-3">
        <button class="btn-primary w-full" @click="addNew">+ Novi model</button>
        <ul class="divide-y divide-ink-900/5 overflow-hidden rounded-2xl bg-white shadow-sm">
          <li
            v-for="(p, i) in list"
            :key="p.slug || '__new'"
            :class="['flex cursor-pointer items-center gap-3 px-3 py-2.5 hover:bg-sand-50', p === selected && 'bg-sand-100']"
            @click="select(p)"
          >
            <div class="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-sand-100">
              <img v-if="p.images[0]" :src="p.images[0]" alt="" class="h-full w-full object-cover" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-semibold">{{ p.name || '(bez imena)' }}</p>
              <p class="truncate text-xs text-ink-600">{{ p.price }} € · {{ shapeLabels[p.shape] }}<span v-if="!p.inStock" class="text-red-600"> · rasprodato</span><span v-if="p.featured"> · ★</span></p>
            </div>
            <div class="flex flex-col text-ink-400">
              <button class="px-1 leading-none hover:text-ink-900" title="Gore" @click.stop="move(i, -1)">▲</button>
              <button class="px-1 leading-none hover:text-ink-900" title="Dolje" @click.stop="move(i, 1)">▼</button>
            </div>
          </li>
        </ul>
        <p class="px-1 text-xs text-ink-600">Redoslijed ovdje je redoslijed na sajtu. ★ = na početnoj strani.</p>
      </aside>

      <!-- Forma -->
      <section v-if="selected" class="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 class="font-display text-2xl font-semibold">{{ isNew ? 'Novi model' : selected.name }}</h2>
            <p class="mt-1 text-xs text-ink-600">
              Link: <code>/naocare/{{ selected.slug || '…' }}</code>
              <span v-if="!isNew"> (slug se ne mijenja da linkovi ne pucaju)</span>
            </p>
          </div>
          <div class="flex gap-2">
            <template v-if="!confirmDelete">
              <button class="btn-secondary !py-2 text-red-700" @click="confirmDelete = true">Obriši</button>
            </template>
            <template v-else>
              <span class="self-center text-sm">Sigurno?</span>
              <button class="btn !bg-red-600 !py-2 text-white" @click="remove">Da, obriši</button>
              <button class="btn-secondary !py-2" @click="confirmDelete = false">Ne</button>
            </template>
          </div>
        </div>

        <div class="mt-6 grid gap-5 md:grid-cols-2">
          <div class="md:col-span-2">
            <label :class="label">Ime modela *</label>
            <input v-model="selected.name" :class="input" placeholder="npr. Aviator Gold Classic" />
          </div>

          <div>
            <label :class="label">Cijena (€) *</label>
            <input v-model.number="selected.price" type="number" min="1" step="0.5" :class="input" />
          </div>
          <div>
            <label :class="label">Stara cijena (€), ako je akcija</label>
            <input v-model.number="selected.oldPrice" type="number" min="0" step="0.5" :class="input" placeholder="prazno = nema akcije" />
          </div>

          <div>
            <label :class="label">Za koga</label>
            <select v-model="selected.gender" :class="input">
              <option v-for="(l, k) in genderLabels" :key="k" :value="k">{{ l }}</option>
            </select>
          </div>
          <div>
            <label :class="label">Oblik</label>
            <select v-model="selected.shape" :class="input">
              <option v-for="(l, k) in shapeLabels" :key="k" :value="k">{{ l }}</option>
            </select>
          </div>

          <div>
            <label :class="label">Boja okvira</label>
            <input v-model="selected.frameColor" :class="input" placeholder="npr. Crna mat" />
          </div>
          <div>
            <label :class="label">Boja stakla</label>
            <input v-model="selected.lensColor" :class="input" placeholder="npr. Zelena polarizovana" />
          </div>

          <div>
            <label :class="label">Brend</label>
            <input v-model="selected.brand" :class="input" />
          </div>
          <div class="flex flex-wrap items-end gap-5 pb-2">
            <label class="flex items-center gap-2 text-sm"><input v-model="selected.polarized" type="checkbox" class="h-4 w-4 accent-ink-900" /> Polarizovane</label>
            <label class="flex items-center gap-2 text-sm"><input v-model="selected.uv400" type="checkbox" class="h-4 w-4 accent-ink-900" /> UV400</label>
            <label class="flex items-center gap-2 text-sm"><input v-model="selected.inStock" type="checkbox" class="h-4 w-4 accent-ink-900" /> Na stanju</label>
            <label class="flex items-center gap-2 text-sm"><input v-model="selected.featured" type="checkbox" class="h-4 w-4 accent-ink-900" /> Na početnoj (★)</label>
          </div>

          <div class="md:col-span-2">
            <label :class="label">Opis</label>
            <textarea v-model="selected.description" rows="3" :class="input" placeholder="Dvije-tri rečenice: kome stoje, za šta su, od čega su." />
          </div>

          <div class="md:col-span-2">
            <label :class="label">Slike</label>
            <div class="flex flex-wrap gap-3">
              <div v-for="(img, i) in selected.images" :key="img" class="group relative h-28 w-28 overflow-hidden rounded-xl border border-ink-900/10 bg-sand-100">
                <img :src="img" alt="" class="h-full w-full object-cover" />
                <span v-if="i === 0" class="absolute left-1 top-1 rounded bg-ink-900 px-1.5 py-0.5 text-[10px] font-semibold text-white">glavna</span>
                <div class="absolute inset-x-0 bottom-0 flex justify-between bg-ink-900/70 px-1 py-0.5 text-white opacity-0 transition group-hover:opacity-100">
                  <button title="Lijevo" @click="moveImage(i, -1)">◀</button>
                  <button title="Obriši" class="text-red-300" @click="removeImage(i)">✕</button>
                  <button title="Desno" @click="moveImage(i, 1)">▶</button>
                </div>
              </div>
              <label :class="['flex h-28 w-28 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-ink-900/20 text-center text-xs text-ink-600 hover:border-ink-900', uploading && 'opacity-50']">
                <span class="text-2xl">+</span>
                {{ uploading ? 'Šaljem…' : 'Dodaj slike' }}
                <input type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" multiple class="hidden" :disabled="uploading" @change="onFiles" />
              </label>
            </div>
            <p class="mt-2 text-xs text-ink-600">Prva slika je glavna. Najbolje kvadratne, min. 1000×1000 px, jpg ili webp. Prevuci mišem preko slike za opcije.</p>
          </div>
        </div>

        <div class="mt-8 flex flex-wrap items-center gap-3 border-t border-ink-900/10 pt-5">
          <button class="btn-primary" :disabled="!dirty || saving" :class="{ 'opacity-50': !dirty || saving }" @click="save">
            {{ saving ? 'Čuvam…' : 'Sačuvaj izmjene' }}
          </button>
          <NuxtLink v-if="selected.slug && !isNew" :to="`/naocare/${selected.slug}`" target="_blank" class="btn-secondary">Otvori na sajtu</NuxtLink>
        </div>
      </section>

      <section v-else class="flex items-center justify-center rounded-2xl border-2 border-dashed border-ink-900/15 p-12 text-center text-ink-600">
        <div>
          <p class="font-display text-xl font-semibold text-ink-900">Izaberi model sa liste ili dodaj novi</p>
          <p class="mt-2 max-w-md text-sm">Kad završiš, klikni „Sačuvaj“ pa „Objavi na sajt“. Objava gura izmjene na GitHub, a hosting sam napravi novu verziju sajta.</p>
        </div>
      </section>
    </div>

    <pre v-if="publishLog" class="mx-auto mb-6 w-full max-w-7xl overflow-x-auto rounded-xl bg-ink-900 p-4 text-xs text-sand-100">{{ publishLog }}</pre>

    <!-- Toast -->
    <Transition enter-active-class="transition duration-200" enter-from-class="translate-y-2 opacity-0" leave-active-class="transition duration-150" leave-to-class="opacity-0">
      <div v-if="toast" :class="['fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full px-5 py-3 text-sm font-medium shadow-lg', toast.kind === 'ok' ? 'bg-ink-900 text-white' : 'bg-red-600 text-white']">
        {{ toast.text }}
      </div>
    </Transition>
  </div>
</template>
