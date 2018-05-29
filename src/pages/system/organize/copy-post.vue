<template>
  <div style="margin-right: 25px;">
    <el-button :disabled="!post.objectid"  @click="showModal" class="default-btn">复制增加</el-button>
    <el-dialog :title="title" :visible.sync="visible" center :width="'450px'">
      <el-form label-width="120px" :model="data" :rules="Rules" :ref="ref" class="el-form-default"
               :validate-on-rule-change="false">
        <el-form-item label="岗位名称：" prop="postname">
          <el-input v-model.trim="data.postname" placeholder="请输入岗位名称"></el-input>
        </el-form-item>
        <el-form-item label="岗位描述：" prop="description">
          <el-input v-model.trim="data.description" placeholder="请输入岗位描述"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="lightControllerType">
          <el-select v-model="data.flag" placeholder="选择状态" clearable style="width: 100%;">
            <el-option v-for="type in companyFlag" :value="type.value" :key="type.value"
                       :label="type.text"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import Service from '../../../services/system'
    import CommonConstant from "../../../constants/common";
    export default {
        name: 'copyPostComponent',
        data() {
            return {
                visible: false,
                data: {},
                ref: 'edit',
                companyFlag: CommonConstant.companyFlag,
                Rules: {
                    postname: [
                        {required: true, message: '请输入岗位名称'}
                    ],
                    description: [
                        {required: true, message: '请输入岗位描述'}
                    ],
                }
            }
        },
        props: {
            post: {
                default: function () {
                    return {}
                }
            }
        },
        created() {
            this.initData();
        },
        computed: {
            title: function () {
                return '编辑岗位';
            },
        },
        methods: {
            initData() {
            },
            add() {
                this.$refs[this.ref].validate(valid => {
                    if (valid) {
                        Service.copyPost(this.data).then(res => {
                            this.emitAddEvent();
                            this.hideModal();
                        });
                    }
                })
            },
            getDetail() {
                this.data.copyid = this.post.objectid;
                this.data.companyid = this.post.companyid;
                this.data.postname = this.post.postname;
                this.data.description = this.post.description;
                this.data.flag = this.post.flag;
            },
            clearValidate() {
                if (this.$refs[this.ref]) this.$refs[this.ref].clearValidate();
            },
            emitAddEvent() {
                this.$emit('initPaging')
            },
            emitEditEvent() {
                this.$emit('initCurrentPaging')
            },
            showModal() {
                this.visible = true;
            },
            hideModal() {
                this.visible = false;
            }
        },
        watch: {
            visible: function (newValue, oldValue) {
                if (newValue) {
                    this.getDetail();
                } else {
                    this.data = {}
                }
            }
        }
    }
</script>