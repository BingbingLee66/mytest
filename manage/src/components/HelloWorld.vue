<template>
  <div class="hello">
    <router-link to='/'>
      <el-button>button</el-button>
    </router-link>
    <router-link to='/user'>
      <el-button type="primary">主要按钮</el-button>
    </router-link>
    <el-button type="success">成功按钮</el-button>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>


