<script lang="ts" setup>
const props = defineProps<{
  header: string;
  description: string;
}>();
var isOpen = ref(false);
function changeState() {
  isOpen.value = !isOpen.value;
  console.log("is open: " + isOpen.value);
}
</script>

<template>
  <div>
    <button
      @click="changeState"
      class="border-b w-full flex flex-row justify-between content-center"
    >
      {{ header }}
      <i
        class="mi-chevron-up before:transform before:transition before:block"
        :class="{
          'before:rotate-0': isOpen,
          'before:rotate-180': !isOpen,
        }"
      />
    </button>
    <div
      class="origin-top transform transition"
      :class="{
        'scale-y-0': !isOpen,
        'scale-y-100': isOpen,
      }"
    >
      {{ description }}
    </div>
  </div>
</template>
