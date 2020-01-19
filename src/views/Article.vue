<template>
    <el-container direction="vertical">
        <dHeader></dHeader>
        <div id="article">
            <mavon-editor v-html="this.value"/>
        </div>
        <dFooter></dFooter>
    </el-container>
</template>

<script>
import dHeader from '@/views/layouts/front/Header'
import dFooter from '@/views/layouts/front/Footer'
export default {
    data: function() {
        return {
            value: 'sdfsadf'
        };
    },
    components: {
        dHeader,
        dFooter
    }
}
</script>

<style>

</style>
