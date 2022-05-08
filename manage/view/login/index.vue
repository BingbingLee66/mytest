<template>
    <div class="login" >
            <div class="login_icon ">
                <i class="el-icon-user" style="border-bottom:solid 2px #fff" ></i>
            </div>  
            <el-form
                :model="form"
                status-icon
                :rules="rules"
                ref="form"
                label-width="100px"
                class="login_container"
            >                 
                <h3 class="login_title"> 用户登录 </h3> 
                <el-form-item label="用户名" label-width="80px" prop="username" class="username">
                    <el-input type="input" v-model="form.username" auto-complete="off" placeholder="请输入账号"></el-input>                 
                </el-form-item>
                <el-form-item label="密码" label-width="80px" prop="password" >
                    <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"></el-input>
               </el-form-item>
                <el-form-item  class="login_submit">
                    <el-button type="primary" @click="login" class="login_submit">登录</el-button>
                </el-form-item>
            </el-form>
    </div>
   
</template>

<script>
// import Mock from "mockjs"
import{getMenu} from '../../api/data'
export default {
    name:'login',
    data(){
        return{
            form:{

            },
            rules:{
                username:[
                    {
                        request:true,
                        message:"请输入用户名",
                        trigger:'blur'
                    },
                    {
                        min:3,
                        message:'用户名长度不能小于3',
                        trigger:'blur'
                    }
                ],
                password:[
                      {
                        request:true,
                        message:"请输入密码",
                        trigger:'blur'
                    },
                ]
            }
        }
    },
    methods:{
        login(){
            getMenu(this.form).then(({data:res})=>{
                //  console.log(res.code)
                //  console.log(res.data)
                if(res.code==20000){
                    this.$store.commit('clearMenu')                  
                    this.$store.commit('setMenu',res.data.menu)
                    this.$store.commit('setToken',res.data.token)
                    this.$store.commit('addMenu',this.$router)
                    this.$router.push({name:'home'})
                }else{
                    this.$message.warning(res.data.message);
                }
            })
        //     // const token=Mock.random.guid()
        //     // this.$store.commit('setToken',token)
        //     // this.$router.push({name:'home'})
        }
    }

}
</script>
<style lang="less" scoped>
.login{
    height: 100vh;
    background-image: url('../../src/assets/images/bg.jpg');
    position: relative;
    z-index: 1;
    //  filter: blur(1px);
}
.login:after{
        content: "";
        width:80%;
        height:80%;
        position: absolute;
        left:0;
        top:0;
        background: inherit;
        filter: blur(5px);
        z-index: -1;
        }
.login_container{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    margin: auto;
    border-radius:15px ;
    background-clip: border-box;
    width: 350px;
    padding: 35px 35px 15px 35px;
    border:1px solid #eaeaea;
    box-shadow: 0 0 20px #cacaca;
    background-color: #ffffffc9;
    z-index: 2;
    // text-align: center;

}
.login_title{
    margin: 0% auto 30px auto;
    text-align: center;
    color: #505456;
}
.login_submit{
    margin: 10px auto 0px auto;
}
.login_icon{
    margin: 0px auto 10px auto;
    text-align: center;
    z-index: 2;
    position: absolute;
    top: 20%;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 80px;
    color: rgb(228, 225, 225);
}
.username{
    text-align: center;
}
</style>
