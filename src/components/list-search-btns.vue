<template>
  <div style="display: inline">
    <div @click="search" class="form-group default-btn">查询</div>
    <div @click="clearSearchParams" class="form-group default-btn">清空</div>
    <div @click="refresh" class="form-group default-btn">刷新</div>
  </div>
</template>
<script>
  export default {
      name: 'listSearchBtnsComponent',
      data: function () {
          return {
          }
      },
      methods: {
          search() {
              this.$emit('search')
          },
          clearSearchParams() {
              this.$emit('clearSearchParams')
          },
          refresh() {
              this.$emit('refresh')
          }
      }
  }
</script>