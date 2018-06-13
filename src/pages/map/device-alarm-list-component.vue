<template>
  <div class="show-err-list">
    <div @click="hidden" class="close">&times;</div>
    <div class="list">
      <table class="table">
        <thead>
        <th>设备名称</th>
        <th>设备ID</th>
        <th>告警类型</th>
        </thead>
        <tbody>
        <tr v-for="device in list">
          <td>{{device.deviceName}}</td>
          <td>{{device.sn}}</td>
          <td>{{device.statusName}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
      name: 'deviceAlarmListComponent',
      data() {
          return {
          }
      },
      props: {
          list: {
              default: function () {
                  return []
              }
          },
      },
      methods: {
          hidden() {
              this.$emit('hide')
          }
      }
  }
</script>
<style lang="less" scoped>
  .show-err-list {
    background: #fff;
    position: absolute;
    left: 180px;
    top: 100px;
    width: 400px;
    height: 300px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
    border-radius: 4px;
    padding: 10px;
    .close {
      font-size: 25px;
    }
    .table {
      td {
        border: none !important;
      }
      th {
        padding: 8px !important;
      }
      tbody {
        display:block;
        height:210px;
        overflow-y:auto;
      }
      thead, tbody tr {
        display:table;
        width:100%;
        table-layout:fixed;
      }
    }
  }
</style>