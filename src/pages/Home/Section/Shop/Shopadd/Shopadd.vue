<template>
  <div></div>
  <div class="box">
    <div class="div">
      <el-dialog title="发布商品！"
                 v-model="dialogFormVisible"
                 :close-on-click-modal=false
                 :modal=true
                 :showClose=false
                 :lock-scroll="false"
                 width="800px">
        <img src="./image/creation.png"
             alt="">
        <el-form :model="form">
          <el-form-item label="商品名称：">
            <el-input v-model="form.title"
                      autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="具体介绍：">
            <el-input type="textarea"
                      placeholder="请输入内容"
                      maxlength="100"
                      autocomplete="off"
                      show-word-limit
                      v-model="form.text">
            </el-input>
          </el-form-item>
          <el-form-item label="类&nbsp; &nbsp; &nbsp; 别：">
            <el-select v-model="form.cless"
                       placeholder="请选择讨论类别"
                       @change="changeclass">
              <el-option label="电子产品"
                         value="tiyu"></el-option>
              <el-option label="日用品"
                         value="kaoyan"></el-option>
              <el-option label="书本"
                         value="kaoyan"></el-option>
              <el-option label="服装类"
                         value="kaoyan"></el-option>
              <el-option label="其他"
                         value="kaoyan"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品图片：">
            <el-upload action="http://8.130.115.231:63010/user/open/upload"
                       list-type="picture-card"
                       :limit=3
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
import { getShopList } from '@/store/shop/index'
import { ElMessage } from 'element-plus';
name: 'Shopadd'
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
const store = getShopList()
async function dialogForm (val) {
  if (val == 'yes') {
    console.log(form.class);
    if (form.title != '' && form.text != '' && form.class != '') {
      store.$patch(state => {
        console.log(form.class);
        state.addforumlist.title = form.title
        state.addforumlist.img = form.img
        state.addforumlist.class = form.class
        state.addforumlist.text = form.text
      })
      await store.AddForum()
      location.reload();
    } else {
      ElMessage.error('信息不能为空哦！')
    }
  }
  else {
    //是否保存
    store.$patch(state => {
      state.addshoplist.title = ''
      state.addshoplist.img = ''
      state.addshoplist.class = ''
      state.addshoplist.text = ''
    })
  }
  form.title = '';
  form.class = '';
  form.text = '';
  form.img = '';
  const store2 = getShopList();
  store2.shopaddshow = false
  dialogFormVisible.value = store2.shopaddshow
}
async function upload (file, fileList) {
  if (file.status == 'success') {
    form.img = await toRaw(file).response.data;
  }
}
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
  }
}




</script>

<style scoped lang="scss" src="./Shopadd.scss">
</style>