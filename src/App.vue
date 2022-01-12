<template>
  <div id="app">
    <div class="header">
      <h1>Добавление нового клиента</h1>
    </div>
    <Survey/>
  </div>
</template>

<script>
import Survey from '@/components/Survey.vue'

export default {
  name: 'App',
  components: {
    Survey
  }
}
</script>

