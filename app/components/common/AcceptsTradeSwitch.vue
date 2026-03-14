<template>
  <div
    class="flex items-center gap-2"
    :class="{ 'justify-between rounded-xl border border-border bg-background px-4 py-3': bordered }"
  >
    <span class="text-sm text-muted-foreground">Acepta permuta</span>
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      @click="$emit('update:modelValue', !modelValue)"
      class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors"
      :class="modelValue ? 'bg-primary' : 'bg-input'"
    >
      <span
        class="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-sm transition-transform"
        :class="modelValue ? 'translate-x-5' : 'translate-x-0'"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: boolean
    bordered?: boolean
  }>(),
  { bordered: false }
)

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>
