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
  <div class="my-4">
    <button
      @click="changeState"
      class="border-b w-full flex flex-row justify-between content-center font-bold text-xl"
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
      class="origin-top transform transition text-xl"
      :class="{
        'scale-y-0': !isOpen,
        'scale-y-100': isOpen,
      }"
    >
      {{ description }}
    </div>
  </div>
</template>
