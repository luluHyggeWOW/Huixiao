<template>
  <div class="box">
    <div class="div">
      <el-dialog title="开始创作！"
                 v-model="dialogFormVisible"
                 :close-on-click-modal=false
                 :modal=true
                 :showClose=false
                 :lock-scroll="false"
                 :on-remove="handleRemove"
                 width="800px">
        <img src="./image/creation.png"
             alt="">
        <el-form :model="form">
          <el-form-item label="标题：">
            <el-input v-model="form.title"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类别：">
            <el-select v-model="form.cless"
                       placeholder="请选择讨论类别"
                       @change="changeclass">
              <el-option label="生活"
                         value="生活"></el-option>
              <el-option label="学习"
                         value="学习"></el-option>
              <el-option label="美食"
                         value="美食"></el-option>
              <el-option label="娱乐"
                         value="娱乐"></el-option>
              <el-option label="其他"
                         value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容：">
            <el-input type="textarea"
                      placeholder="请输入内容"
                      maxlength="100"
                      autocomplete="off"
                      show-word-limit
                      v-model="form.text">
            </el-input>
          </el-form-item>
          <el-form-item label="图片：">
            <el-upload action="http://101.43.241.101:63010/user/open/upload"
                       list-type="picture-card"
                       :limit=1
                       :on-change="upload"
                       :before-upload="beforeAvatarUpload"
                       accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF">
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
import { ref, reactive, getCurrentInstance, watch, toRaw } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { getForumList } from '@/store/forum/index'
import { ElMessage } from 'element-plus';
name: 'Forumadd'
let form = reactive({
  title: '',
  class: '',
  text: '',
  img: '',
})

let dialogFormVisible = ref(true)

const changeclass = (e) => {
  form.class = e
}
const store = getForumList()
const store2 = getForumList();
async function dialogForm (val) {
  if (val == 'yes') {
    if (form.title != '' && form.text != '' && form.class != '') {
      store.$patch(state => {
        state.addforumlist.title = form.title
        state.addforumlist.img = form.img
        state.addforumlist.class = form.class
        state.addforumlist.text = form.text
      })
      await store.AddForum()
      store.$patch(state => {
        store.page = 1;
      })
      await store.getList()
      dialogFormVisible.value = store2.forumaddshow = false
    } else {
      ElMessage.error('信息不能为空哦！')
      dialogFormVisible.value = store2.forumaddshow = true
      console.log(111, dialogFormVisible.value);
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
    dialogFormVisible.value = store2.forumaddshow = false
  }
  // document.getElementsByClassName('box')[0].style.display = "none"
  // document.getElementsByTagName('body')[0].className = '';
  form.title = '';
  form.class = '';
  form.text = '';
  form.img = '';


}
async function upload (file, fileList) {
  if (file.status == 'success') {
    form.img = await toRaw(file).response.data;
  }
}
const beforeAvatarUpload = (file) => {
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 2MB!')
  }
}
const handleRemove = (file) => {
  console.log(toRaw(file).response.data);
  form.img = form.img.filter((item) => item !== toRaw(file).response.data);
  console.log(form.img);
}
watch([() => store.shopaddshow], (newvalue, oldvalue) => {

  dialogFormVisible.value = store.forumaddshow
  console.log('forumadd', dialogFormVisible.value);
})



</script>

<style scoped lang="scss" src="./Forumadd.scss">
</style>