<template>
  <div :class="[color, 'text-gray-600 rounded-lg p-2 max-w-xs break-all']">
    <p class="text-sm text-white">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Bubble',
  props: {
    message: String,
    color: {
      default: 'bg-blue-500',
      type: String
    }
  }
}
</script>
