
<template>
    <el-container style="hight:100%">
        <el-aside width="auto">
            <CommentAside></CommentAside>
        </el-aside>
        <el-container>
            <el-header>
            <CommentHeader></CommentHeader>
            </el-header>
             <CommentTag></CommentTag>
        <el-main>
            <router-view></router-view>
        </el-main>
        </el-container>
    </el-container>
</template>





<script>
import CommentAside from "../src/components/CommentAside.vue"
import CommentHeader from "../src/components/CommentHeader.vue"
import CommentTag from "../src/components/CommentTags.vue"
export default {
    name:'Home',
    components:{
        CommentAside,
        CommentHeader,
        CommentTag
    },
    data(){
        return{}
    }

}
</script>

<style lang='less' scoped>
.el-header{
    background-color: #333;
}
.el-main{
    padding-top: 0%;
}

</style>