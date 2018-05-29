<template>
  <div class="console-center">
    <div class="console-content">
      <div class="console-scroll" id="console-scroll">
        <div :ref="test" style="display: inline-block">
          <template v-for="(item,index) in data">
            <div class="console-item">
              <!--<span>{{item.id}}、</span>-->
              <span>{{index + 1}}、</span>
              <span>{{item.uptime}}</span>
              <span>,</span>
              <span>{{item.deviceName}}</span>
              <span>,</span>
              <span>设备ID : {{item.sn}}</span>
              <span>,</span>
              <span>{{item.alarmContent}}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'consoleComponent',
        data() {
            return {
                test: 'test-ref',
                datas: [],
                length: 100,
            }
        },
        props: {
            data: {
                default: function () {
                    return ['aaaaaaaaaaaaaaaaaaa']
                }
            }
        },
        created() {
        },
        methods: {
        },
        watch: {
           /* data: function (newVal) {
                if (newVal) {
                    newVal.forEach(item => {
                        if (this.datas.length >= this.length) {
                            this.datas.pop();
                        }
                    });
                    this.datas.unshift(item);
                }
            }*/
        }
    }
</script>
<style lang="less" scoped>
  .console-center {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    .console-content {
      width: 100%;
      height: 40%;
      background: linear-gradient(to bottom, rgba(7,72,111,0.8), rgba(7,72,111,0.2) 40%, rgba(7,72,111,0.2) 60%, rgba(7,72,111,0.8));
      padding: 10px 0;
      display: flex;
      align-items: center;
      .console-scroll{
        padding: 0 30px;
        height: 80%;
        width: 100%;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 5px;
          height: 5px;
          cursor: pointer;
        }
       &::-webkit-scrollbar-thumb {
         border-radius: 10px;
         box-shadow: inset 0 0 6px rgba(0,0,0,.3);
         background-color: #2ca1b9;
        }
        &::-webkit-scrollbar-track {
           background-color: transparent;
        }
        .console-item{
          color: #FDCD72;
          font-size: 14px;
          display: flex;
          justify-content: flex-start;
          overflow: hidden;
          text-overflow: ellipsis;
          span {
            white-space: nowrap;
            margin-right: 5px;
          }
        }
      }

    }
  }
</style>