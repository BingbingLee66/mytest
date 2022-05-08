<template>
    <div>
      <el-row class="home" :gutter="20">
          <el-col :span="8" >
              <el-card shadow="hover">
                  <div class="user">
                      <img :src="userImg" />
                      <div class="userinfo" >
                          <p class="name">Admin</p>
                          <p class="access">超级管理员</p>
                      </div>
                  </div>
                  <div class="login-info">
                      <p>上次登录时间<span>2022-2-15</span></p>
                      <p>上次登录地点<span>武汉</span></p>
                  </div>
              </el-card>
              <el-card shadow="hover" style="margin-top:20px;height:460px">
                  <el-table :data="tabledata">
                      <el-table-column v-for="(value,key) in tabbleLabel" :key="key" :prop="key" :label="value">

                      </el-table-column>
                  </el-table>
              </el-card>
          </el-col>
          <el-col :span="16" >
              <div class="num">
                  <el-card shadow="hover" v-for="item in countdata" :key="item.name" :body-style="{display:'flex', padding:0}">
                      <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                      <div class='detail'>
                            <p class="num">￥{{item.value}}</p>
                            <p class="txt">{{item.name}}</p>
                      </div>
                  </el-card>
              </div>
              <el-card shadow="hover" style="height:280px">
                  <!-- <div style="height:280px" ref="echarts"></div> -->
                  <Echarts :chartData="echartsData.order"  style="height:280px"></Echarts>
              </el-card>
              <div class="graph" >
                  <el-card style="height:265px">
                        <!-- <div style="height:260px" ref="userEcharts"></div> -->
                  <Echarts :chartData="echartsData.user"  style="height:260px"></Echarts>
                  </el-card>
                  <el-card style="height:265px">
                        <!-- <div style="height:260px" ref="videoEcharts"></div> -->
                  <Echarts :chartData="echartsData.video" :isAxisChart="false" style="height:260px"></Echarts>
                  </el-card>
              </div>
          </el-col>
      </el-row>
    </div>
   
</template>

<script>
import {getData} from'../../api/data.js'
//  import {getMenu} from'../../api/data.js'
// import * as echarts from 'echarts'
import Echarts from '../../src/components/Echarts.vue'

export default {
    name:'home',
    components:{
        Echarts
    },
    data(){
        return{
            userImg: require('../../src/assets/images/me.jpg'),
            tabledata:[],
            tabbleLabel:{
                name:'手机',
                todaybuy:'当日购买',
                monthbuy:'本月购买',
                totalbuy:'总购买',
            },
            countdata:[
                {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9"
                },
                {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980"
                },
                {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef"
                },
                {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9"
                },
                {
                    name: "本月收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980"
                },
                {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef"
            }
            ],
            echartsData:{
                order:{
                    xData:[],
                    series:[]
                },
                user:{
                    xData:[],
                    series:[]
                },
                video:{
                    series:[]
                }
            }
        }
    },
    mounted() {
        getData().then(res =>{
            const {code ,data}=res.data
            if(code===2000){
                this.tabledata=data.tabledata
                const order =data.orderData
                const xData = order.date
                //  console.log(xData)
                const keyArray=Object.keys(order.data[0])
                //  console.log(keyArray)
                const series =[]
                keyArray.forEach( key=>{
                    series.push({
                        name:key,
                        data:order.data.map(item=>item[key]),
                        type:'line'
                    })
                })
                // const option={
                //     xAxis:{
                //         data:xData
                //     },
                //     yAxis:{},
                //     legend:{
                //         data:keyArray
                //     },
                //     series
                // }
                // const E=echarts.init(this.$refs.echarts)
                // E.setOption(option)
                this.echartsData.order.xData=xData
                this.echartsData.order.series=series
                // console.log(this.echartsData)
                //用户图
                // const userOption ={
                //     legend:{
                //         //文字颜色
                //         textStyle:{
                //             color:'#333'
                //         },
                //     },
                //     grid:{
                //         left:"20%"
                //     },
                //     //提示框
                //     tooltip:{
                //         trigger:"axis"
                //     },
                //     xAxis:{
                //         type:"category",
                //         data:data.userData.map(item=>item.data),
                //         axisLine:{
                //             LineStyle:{
                //                 color:"#17b3a3",
                //             },
                //         },
                //         axisLabel:{
                //            Interval:0,
                //            color:'#333'
                //         },
                //     },
                //     yAxis:[
                //         {
                //             type:"value",
                //             axisLine:{
                //                 LineStyle:{
                //                     color:"#17b3a3",
                //                 },
                //             }
                //         }
                //     ],
                //     color:['#2ec7c9','#b6a2de'],
                //     series:[
                //         {
                //             name:'新增用户',
                //             data:data.userData.map(item=>item.new),
                //             type:'bar'
                //         },
                //         {
                //             name:'活跃用户',
                //             data:data.userData.map(item=>item.active),
                //             type:'bar'
                //         },
                //     ]                          
                // } 
                // const U=echarts.init(this.$refs.userEcharts)
                // U.setOption(userOption )
                this.echartsData.user.xData=data.userData.map(item=>item.data)
                this.echartsData.user.series=[
                        {
                            name:'新增用户',
                            data:data.userData.map(item=>item.new),
                            type:'bar'
                        },
                        {
                            name:'活跃用户',
                            data:data.userData.map(item=>item.active),
                            type:'bar'
                        },
                    ]                          
                //饼图
                // const videoOption={
                //     title: {
                //         text: '用户数据',
                //         subtext: '用户量',
                //         left: 'center'
                //     },
                //     tooltip:{
                //         trigger:"item",
                //     },
                //     legend: {
                //         orient: 'vertical',
                //         left: 'left'
                //     },
                //     color:[
                //         "#0f78f4",
                //         "#dd536b",
                //         "#9462b5",
                //         "#a5a6a6",
                //         "#e1bb22",
                //         "#39c362",
                //         "#3ed1cf",
                //     ],
                //     series:[
                //         { 
                //             radius: '50%',
                //             data:data.videoData,
                //             type:'pie'
                //         }
                //     ],
                //     emphasis: {
                //         itemStyle: {
                //         shadowBlur: 10,
                //         shadowOffsetX: 0,
                //         shadowColor: 'rgba(0, 0, 0, 0.5)'
                //         }
                //     }
                // }
                // const V=echarts.init(this.$refs.videoEcharts)
                // V.setOption(videoOption)
                this.echartsData.video.series=[
                        { 
                            radius: '50%',
                            data:data.videoData,
                            type:'pie'
                        }
                    ]
            //    console.log(this.echartsData)
            }
            
            
        })
    //     getMenu().then(function(res){
    //         console.log(res)
    //     }).catch(err =>{
    //     console.log(err,'此处是捕获到的错误信息')
    // })
        // this.$axios.get('/=123user?ID45')
        // .then(function (response) {
        //     console.log(response);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
 
    },

}
</script>
