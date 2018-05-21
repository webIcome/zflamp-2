<template>
  <div class="console-center">
    <div class="console-content">
      <div class="console-scroll" id="console-scroll">
        <template v-for="item in datas">
          <div class="console-item">{{item}}</div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'consoleComponent',
        data() {
            return {
                datas: [1,1,1,1,1,11,1,1,1,1,1,1,1],
                length: 100,
            }
        },
        props: {
            data: {
                default: function () {
                    return []
                }
            }
        },
        created() {

        },
        methods: {
        },
        watch: {
            data: function (newVal) {
                if (newVal) {
                    newVal.forEach(item => {
                        if (this.datas.length >= this.length) {
                            this.datas.pop();
                        }
                    });
                    this.datas.push(item);
                }
            }
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
        overflow-y: scroll;
       &::-webkit-scrollbar-thumb {
         border-radius: 10px;
         box-shadow: inset 0 0 6px rgba(0,0,0,.3);
         background-color: #564;
        }
        &::-webkit-scrollbar-track {
           box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
           border-radius: 10px;
           background-color: transparent;
        }
        .console-item{
          color: #FDCD72;
          font-size: 14px;
        }
      }

    }
  }
</style>