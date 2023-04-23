<template>
  <div class="box">
    <div class="div">
      <p>学校名称：</p>
      <div class="input">
        <el-input v-model="input"
                  placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="div">
      <p>入学时间：</p>
      <div class="input">
        <el-input v-model="input"
                  placeholder="请输入内容"></el-input>
      </div>
    </div>

    <div class="div">
      <p>专业：</p>
      <div class="input">
        <el-input v-model="input"
                  placeholder="请输入内容"></el-input>

      </div>
    </div>
    <div class="div">
      <p>学历：</p>
      <div class="input">
        <el-input v-model="input"
                  placeholder="请输入内容"></el-input>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue';
name: 'school'



</script>

<style scoped lang="scss" src="./school.scss">
</style>