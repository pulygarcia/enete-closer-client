<script setup lang="ts">

</script>

<template>
    <p class="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Catálogo</p>
    <div class="mb-8 flex items-end justify-between">
        <div>
        <h2 class="font-display text-3xl font-extrabold tracking-tight text-foreground">
            Vehículos disponibles
        </h2>
        <p class="mt-1 text-sm text-muted-foreground">Todos con estado detallado y precio transparente.</p>
        </div>
        <NuxtLink
        to="/vehicles"
        class="hidden sm:flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
        Ver todos
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
        </NuxtLink>
    </div>
</template>