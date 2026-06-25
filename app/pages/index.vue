<template>
  <div>
    <h1>Hello World! i love you 3000</h1> 
    <v-btn>Submit</v-btn>  
  </div>
</template>

<script lang="ts" setup>
  //@ts-nocheck
  definePageMeta({
  middleware: 'auth'
})

</script>

<style>

</style>