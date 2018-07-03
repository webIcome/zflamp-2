<template>
  <div class="batch-component">
    <el-dropdown @command="handleCommand">
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
          @on-success="success"
          @on-error="fault"
          :action="url">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip">只能上传xlsx文件</div>
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
  </div>
</template>
<script>
    import ExcelFileClass from '../utils/excel-file-class'
    import CommonConstant from "../constants/common";
    import Storage from '../store/user';
    export default {
        name: 'operDoorComponent',
        data() {
            return {
                visible: false,
                ref: 'file-form',
                type: 1,
                headers: {}
            }
        },
        props: {
            fileName: '',
            url: ''
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
                ExcelFileClass.getExcel(this.url, this.fileName)
            },
            uploadExcel() {
                this.$refs.upload.submit();
            },
            showModal() {
                this.visible = true;
                this.setHeaders(Storage.state);
            },
            setHeaders(storage) {
                let headers = {};
                if (storage.user.objectid) {
                    headers['access_token'] = storage.token;
                    headers['user_name'] = storage.user.loginname;
                    headers['user_id'] = storage.user.objectid.toString();
                    headers['company_id'] = storage.user.companyid.toString();
                }
                this.headers = headers
            },
            success(response, file, fileList) {

            },
            fault(err, file, fileList) {
                console.log(err)
                console.log(fileList)
            }
        }
    }
</script>
<style lang="less">
  .batch-component {
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