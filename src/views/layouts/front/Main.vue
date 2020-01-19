<template>
    <el-main id="main">
        <el-row :gutter="20">
            <el-col :span="18">
                <dArticleList :items="this.items"></dArticleList>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>卡片名称</span>
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        {{'列表内容 ' + o }}
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-main>
</template>

<script>
import dArticleList from "@/components/List/ArticleList"
export default {
    data: function() {
        return {
            items: [
                {
                    id: 1,
                    title: 'test1',
                    image: {
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        fit: 'fill'
                    },
                    content: 'test1',
                    create_time: '2020-01-01' 
                },
                {
                    id: 2,
                    title: 'test2',
                    image: {
                        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        fit: 'fill'
                    },
                    content: 'test2',
                    create_time: '2020-01-02' 
                }
            ]
        };
    },
    components: {
        dArticleList
    }
}
</script>

<style>

</style>