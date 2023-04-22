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

        <img src="
                 ./image/creation.png"
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
            <el-select v-model="form.text"
                       placeholder="请选择讨论类别">
              <el-option label="体育"
                         value="shanghai"></el-option>
              <el-option label="考研"
                         value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容："
                        :label-width="formLabelWidth">
            <el-input type="textarea"
                      placeholder="请输入内容"
                      v-model="form.text"
                      maxlength="100"
                      autocomplete="off"
                      show-word-limit>
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
            <el-dialog v-model="dialogVisible">
              <img width="100%"
                   :src="dialogImageUrl"
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
name: 'Forumadd'
let form = reactive({
  title: '',
  class: '',
  text: '',
  img: '',
})
let dialogFormVisible = ref(false)
let Props = defineProps({
  dialogFormVisible: {
    type: Boolean
  }
})
//取消
function dialogForm (val) {
  if (val == 'yes') {
  }
  else {
    //是否保存

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