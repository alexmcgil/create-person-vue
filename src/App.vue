<template>
  <div id="app">
    <header class="header">
      <h1 class="header__info">Добавление нового клиента</h1>
    </header>
    <Survey/>
  </div>
</template>

<script>
import Survey from '@/components/Form.vue'

export default {
  name: 'App',
  components: {
    Survey
  }
}
</script>

