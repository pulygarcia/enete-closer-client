<script setup lang="ts">
    const stats = [
        { value: '24+', label: 'Autos disponibles' },
        { value: '100%', label: 'Atención directa' },
        { value: '10', label: 'Puntuación por clientes' },
    ]
</script>

<template>
  <div class="flex gap-8 lg:gap-16 border-t border-border pt-8 lg:pt-10">
        <div v-for="stat in stats" :key="stat.label" class="flex flex-col gap-1">
            <span class="font-display text-2xl lg:text-3xl font-extrabold text-foreground">{{ stat.value }}</span>
            <span class="text-xs lg:text-sm text-muted-foreground">{{ stat.label }}</span>
        </div>
    </div>
</template>