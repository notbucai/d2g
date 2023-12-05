<template>
  <van-contact-card type="edit" :name="name" :tel="tel" :editable="false" />
</template>

<script lang="ts" setup>
defineProps<{
  name: string;
  tel: string;
}>();
</script>
