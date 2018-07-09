<template>
  <div class="batch-component">
    <el-dropdown @command="handleCommand" trigger="click">
         <el-button type="warning">
           批量导入<i class="el-icon-arrow-down el-icon--right"></i>
         </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="download">模板下载</el-dropdown-item>
        <el-dropdown-item command="upload">批量导入</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="批量导入" :visible.sync="visible" center :width="'600px'">
      <el-upload
          class="upload-demo"
          ref="upload"
          drag
          accept=".xlsx"
          :auto-upload="false"
          :data="{type: type}"
          :headers="headers"
          :limit="1"
          :file-list="fileList"
          :http-request="upload"
          :on-success="success"
          :on-error="fault"
          :action="uploadUrl">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip">只能上传xlsx文件，且只能上传一个文件</div>
      </el-upload>
      <div style="display: flex; align-items: center; margin-top: 10px;">
        <div style="margin-bottom: 5px; margin-right: 10px">重复数据：</div>
        <el-radio-group v-model="type">
          <el-radio :label="1">提醒</el-radio>
          <el-radio :label="2">覆盖</el-radio>
          <el-radio :label="3">忽略</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="uploadExcel">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="格式提醒" :visible.sync="faultVisible" center :width="'600px'">
      <p class="text-center" v-for="data in faultData">{{data}}</p>
    </el-dialog>
  </div>
</template>
<script>
    import ExcelFileClass from '../utils/excel-file-class'
    import CommonConstant from "../constants/common";
    import Storage from '../store/user';
    export default {
        name: 'batchCreateDataComponent',
        data() {
            return {
                visible: false,
                ref: 'file-form',
                type: 1,
                headers: {},
                fileList: [],
                uploadVisible: true,
                faultVisible: false,
                faultData: []
            }
        },
        props: {
            fileName: '',
            url: '',
            baseUrl: ''
        },
        computed: {
            uploadUrl: function () {
                return this.url + 'upload'
            },
            downloadUrl: function () {
                return this.url + 'download/template'
            }
        },
        methods: {
            handleCommand(command) {
                let fn;
                switch (command) {
                    case 'download':
                        fn = this.getExcel;
                        break;
                    case 'upload':
                        fn = this.showModal;
                        break;
                }
                fn();
            },
            getExcel() {
                ExcelFileClass.getExcel(this.baseUrl, this.downloadUrl, this.fileName)
            },
            uploadExcel() {
                this.$refs.upload.submit();
            },
            upload(content) {
                ExcelFileClass.uploadExcel(this.baseUrl, this.uploadUrl, {file: content.file, opType: this.type}).then(res => {
                    if (res.data.success) {
                        content.onSuccess(res)
                    } else {
                        content.onError(res)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            showModal() {
                this.visible = true;
            },
            hideModal() {
                this.visible = false;
            },
            showFaultModal() {
                this.faultVisible = true;
            },
          /*  setHeaders(storage) {
                let headers = {};
                if (storage.user.objectid) {
                    headers['access_token'] = storage.token;
                    headers['user_name'] = storage.user.loginname;
                    headers['user_id'] = storage.user.objectid.toString();
                    headers['company_id'] = storage.user.companyid.toString();
                }
                this.headers = headers
            },*/
            success(response, file, fileList) {
                this.$refs.upload.clearFiles();
                this.hideModal();
                this.emitEvent();
            },
            fault(res, file, fileList) {
                this.faultData = res.data.msg.split(';');
                this.showFaultModal()
            },
            emitEvent() {
                this.$emit('initPaging')
            },
        }
    }
</script>
<style lang="less">
  .batch-component {
    margin-right: 25px;
    .el-button--warning {
      color: #fff;
      background-color: #FF854A;
      border-color: #FF854A;
      padding: 9px 5px 9px 19px;
    }
    input[type="file"] {
      display: none;
    }
    .el-dialog__body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .upload-demo {
      display: inline-block;
    }
  }
</style>