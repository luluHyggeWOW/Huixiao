<template>
  <nav>
    <el-menu default-active="1-4-1"
             class="el-menu-vertical-demo">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <template #title>导航二</template>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <template #title>导航二</template>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <template #title>导航二</template>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-menu"></i>
        <template #title>导航二</template>
      </el-menu-item>

    </el-menu>
  </nav>
</template>

<script>
export default {
  name: 'Nav'

}
</script>

<style scoped lang="scss" src="./Nav.scss">
</style>