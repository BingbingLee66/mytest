<template>
    <header>
        <div class="l-content"> 
            <el-button @click="handleMenu" plain icon="el-icon-menu" size='mini'></el-button>
                <el-breadcrumb separator="/" >
                    <el-breadcrumb-item class="myColor" v-for="item in tags"  :key="item.path"  :to="{ path:item.path }" >{{item.label}}</el-breadcrumb-item>
                </el-breadcrumb> 
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini">
                <span><img class="user" :src="userImg" ></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-switch-button" @click.native="logOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>
<script>
import {mapState} from 'vuex'
export default{
    name:'CommentHeader',
    data(){
        return{
            userImg:require('../assets/images/me.jpg'),
        }
    },
    methods:{
        handleMenu()
        {  
            this.$store.commit("collapseMenu")
            console.log("111")
        },
        logOut(){
            this.$store.commit('clearToken')   
            this.$store.commit('clearMenu')   
            this.$router.push({name:'login'})
        }
      
    },
    computed:{
        ...mapState({
            tags: state=>state.tab.tabsList
        })
    },
   
}
</script>
<style lang="less" scoped>
header{
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
}
.l-content{
    display: flex;
    align-items: center;
    .el-button{
        margin-right: 20px;
    }
}
.r-content{
    .user{
        height: 40px;
        width: 40px;
        border-radius: 50%;
        padding: 1px;
        background-color:rgb(255, 250, 250) ;
    }
}
.myColor /deep/ .el-breadcrumb__inner {
  color: #d1d1d1 ;
}

</style>
