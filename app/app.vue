<script setup lang="ts">
import { site } from '~/site.config'

useSeoMeta({
  description: site.description,
  ogSiteName: site.name,
  ogType: 'website',
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
