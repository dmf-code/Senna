<template>
  <div class="home">
    <el-container direction="vertical">
      <dHeader></dHeader>
      <dMain></dMain>
      <dFooter></dFooter>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import dHeader from '@/views/layouts/front/Header'
import dMain from '@/views/layouts/front/Main'
import dFooter from '@/views/layouts/front/Footer'

export default {
  name: 'home',
  components: {
    dHeader,
    dMain,
    dFooter
  }
}
</script>
