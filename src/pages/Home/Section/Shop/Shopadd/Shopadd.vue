<template>
  <div class="box">
    <div class="div">
      <el-dialog title="发布商品！" v-model="dialogFormVisible" :modal=true :showClose=false :lock-scroll="false"
        width="800px">
        <img src="./image/creation.png" alt="">
        <el-form :model="form">
          <el-form-item label="商品名称：">
            <el-input v-model="form.title" autocomplete="off" placeholder="请输入商品名称"></el-input>
          </el-form-item>

          <el-form-item label="具体介绍：">
            <el-input type="textarea" placeholder="请输入具体介绍" maxlength="100" autocomplete="off" show-word-limit
              v-model="form.text">
            </el-input>
          </el-form-item>
          <el-form-item label="商品价格：">
            <el-input placeholder="请输入价格" autocomplete="off" v-model.number="form.price" type="number">
            </el-input>
          </el-form-item>
          <el-form-item label="商品类别：">
            <el-select v-model="form.cless" placeholder="请选择讨论类别" @change="changeclass">
              <el-option label="电子产品" value="电子产品"></el-option>
              <el-option label="日用品" value="日用品"></el-option>
              <el-option label="书本" value="书本"></el-option>
              <el-option label="服装类" value="服装"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品图片：">
            <el-upload action="http://101.43.241.101:63010/user/open/upload" list-type="picture-card" :limit=3
              :on-change="upload" :on-remove="handleRemove"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF">
              <div class="el-icon-plus">
                +</div>
            </el-upload>
            <el-dialog v-model="form.imgflag">
              <img width="100%" :src="form.img" alt="">
            </el-dialog>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible=false">取 消</el-button>
            <el-button type="primary" @click="dialogForm('yes')">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, watch, toRaw, defineExpose } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { getShopList } from '@/store/shop/index'
import { ElMessage } from 'element-plus';
name: 'Shopadd'
let form = reactive({
  title: '',
  class: '',
  text: '',
  price: '',
  img: []

  ,
})

let dialogFormVisible = ref(false)

const changeclass = (e) => {
  form.class = e
}
const store = getShopList()
async function dialogForm (val) {
  if (val == 'yes') {
    if (form.title != '' && form.text != '' && form.class != '' && form.img != '') {
      store.$patch(state => {
        state.addshoplist.title = form.title
        state.addshoplist.img = form.img
        state.addshoplist.class = form.class
        state.addshoplist.text = form.text
        state.addshoplist.price = form.price
      })
      await store.AddShop()
      await store.getAllList()
      dialogFormVisible.value = false
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
      store.shopaddshow = false
    })
  }
  form.title = '';
  form.class = '';
  form.text = '';
  form.img = '';
  form.price = '';

}
async function upload (file, fileList) {
  if (file.status == 'success') {
    // form.img.push('1')
    form.img.push(await toRaw(file).response.data)
  }
}
const handleRemove = (file) => {
  console.log(toRaw(file).response.data);
  form.img = form.img.filter((item) => item !== toRaw(file).response.data);
  console.log(form.img);
}
let props = defineProps(['Shopaddflag'])
const Shopaddshowflag = () => {
  console.log(111);
  dialogFormVisible.value = props.Shopaddflag
}

defineExpose({
  dialogFormVisible
})


</script>

<style scoped lang="scss" src="./Shopadd.scss">
</style>