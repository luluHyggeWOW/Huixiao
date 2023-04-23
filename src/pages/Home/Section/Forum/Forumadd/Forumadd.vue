<template>
  <div class="box">
    <div class="div">
      <el-dialog title="开始创作！"
                 v-model="dialogFormVisible"
                 :close-on-click-modal=false
                 :modal=true
                 :showClose=false
                 :lock-scroll="false"
                 width="800px">

        <img src="./image/creation.png"
             alt="">
        <el-form :model="form"
                 :key="timer">
          <el-form-item label="标题："
                        :label-width="formLabelWidth">
            <el-input v-model="form.title"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类别："
                        :label-width="formLabelWidth">
            <el-select v-model="form.cless"
                       placeholder="请选择讨论类别">
              <el-option label="体育"
                         value="tiyu"></el-option>
              <el-option label="考研"
                         value="kaoyan"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容："
                        :label-width="formLabelWidth">
            <el-input type="textarea"
                      placeholder="请输入内容"
                      maxlength="100"
                      autocomplete="off"
                      show-word-limit
                      v-model="form.text">
            </el-input>
          </el-form-item>
          <el-form-item label="图片："
                        :label-width="formLabelWidth">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                       list-type="picture-card"
                       :on-preview="handlePictureCardPreview"
                       :on-remove="handleRemove"
                       :limit=1>
              <div class="el-icon-plus">
                +</div>
            </el-upload>
            <el-dialog v-model="form.imgflag">
              <img width="100%"
                   :src="form.img"
                   alt="">
            </el-dialog>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogForm('no')">取 消</el-button>
            <el-button type="primary"
                       @click="dialogForm('yes')">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, watch } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { getForumList } from '@/store/forum/index'
import { ElMessage } from 'element-plus';
name: 'Forumadd'
let form = reactive({
  title: '',
  class: '',
  text: '',
  img: '',
  imgflag: false,
})
let dialogFormVisible = ref(false)
let Props = defineProps({
  dialogFormVisible: {
    type: Boolean
  }
})
const store = getForumList()
function dialogForm (val) {
  if (val == 'yes') {
    if (form.title != '' && form.class != '' && form.text != '') {
      store.$patch(state => {
        state.addforumlist.title = form.title
        state.addforumlist.img = form.img
        state.addforumlist.class = form.class
        state.addforumlist.text = form.text
        console.log(form.img);
      })
      ElMessage.success('发布成功！')
    } else {

      ElMessage.error('信息不能为空哦！')
    }
  }
  else {
    //是否保存
    store.$patch(state => {
      state.addforumlist.title = ''
      state.addforumlist.img = ''
      state.addforumlist.class = ''
      state.addforumlist.text = ''
    })
  }
  document.getElementsByClassName('box')[0].style.display = "none"
  dialogFormVisible = ref(false)
  document.getElementsByTagName('body')[0].className = '';
  form.title = '';
  form.class = '';
  form.text = '';
  form.img = '';
}


watch([Props, dialogFormVisible], (newvalue, oldvalue) => {
  if (newvalue[0]) {
    dialogFormVisible = newvalue
  }
})


</script>

<style scoped lang="scss" src="./Forumadd.scss">
</style>