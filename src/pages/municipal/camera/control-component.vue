<template>
  <div class="control-items">
    <div class="control">
      <el-button :disabled="!devices.length" @click="showModal" class="control-btn">播放</el-button>
    </div>
    <el-dialog class="video-dialog" title="" :visible.sync="visible" center top="0">
      <div class="video" v-if="visible">
        <template v-for="url in urls">
          <iframe :src="url" scrolling="auto"></iframe>
        </template>
      </div>
    </el-dialog>
  </div>

</template>

<script>
    import CommonContent from "../../../constants/common";
    export default {
        name: 'controlCameraComponent',
        components: {},
        data() {
            return {
                visible: false,
            }
        },
        props: {
            devices: {
                default: function () {
                    return []
                }
            }
        },
        computed: {
            urls: function () {
                let url = [];
                this.devices.forEach(item => {
                    url.push(this.getUrl(item.serviceIp, item.servicePort, item.deviceUser, item.devicePassword, item.splitNumber, item.previewChannel))
                });
                return url;
            }
        },
        created: function () {
        },
        methods: {
            showModal() {
                this.visible = true;
            },
            hideModal: function () {
                this.visible = false;
            },
            getUrl(url, port, user, pass, slice, open) {
                return 'http://' + url + ':' + port + '/dispatch.asp?user=' + user + '&pass=' + pass + '&page=preview.asp[&slice=' + slice + '&open={' + open + '}]'
            }
        }
    }
</script>
<style src="../control.less" lang="less" scoped></style>
<style lang="less" scoped>

</style>
<style lang="less">
  .video-dialog {
    margin: 0;
    .el-dialog__header {
      /*display: none;*/
    }
    .el-dialog {
      position: absolute;
      top: 50px;
      bottom: 50px;
      left: 50px;
      right: 50px;
      width: auto;
      margin: 0;
      .el-dialog__body {
        position: absolute;
        top: 60px;
        bottom: 0px;
        left: 0px;
        right: 0;
        padding: 0;
        .video {
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          iframe {
            flex: auto;
            width: 50%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
