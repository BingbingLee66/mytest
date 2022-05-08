<template>
    <div ref="echart"></div>
</template>
<script>
import * as echarts from 'echarts'
export default {
    props:{
        isAxisChart:{
            type:Boolean,
            default:true
        },
        chartData:{
            type:Object,
            default(){
                return{
                    xData:[],
                    series:[]
                }
            }
        }
    },
    watch:{
        chartData:{
            handler:function () {
                this.initChart()
            },
            deep:true
        }
    },
    methods:{
        initChart(){
            this.initChartData()
            if(this.echart){
                this.echart.setOption(this.Option)
            }else{
                this.echart=echarts.init(this.$refs.echart)
                this.echart.setOption(this.Option)
            }

        },
        initChartData(){
            if(this.isAxisChart){
                this.axisOption.xAxis.data=this.chartData.xData
                this.axisOption.series=this.chartData.series
            }else{
                this.normalOption.series=this.chartData.series
            }
        }
    },
    data(){
        return{
            axisOption:{
                legend:{
                    //文字颜色
                    textStyle:{
                        color:'#333'
                    },
                },
                grid:{
                    left:"20%"
                },
                //提示框
                tooltip:{
                    trigger:"axis"
                },
                xAxis:{
                    type:"category",
                    data:[],
                    axisLine:{
                        LineStyle:{
                            color:"#17b3a3",
                        },
                    },
                    axisLabel:{
                        Interval:0,
                        color:'#333'
                    },
                },
                yAxis:[
                    {
                        type:"value",
                        axisLine:{
                            LineStyle:{
                                color:"#17b3a3",
                             },
                        }
                    }
                ],
                // color:['#2ec7c9','#b6a2de'],
                series:[]                                           
            },
            normalOption:{
                title: {
                    text: '用户数据',
                    subtext: '用户量',
                    left: 'center'
                },
                tooltip:{
                    trigger:"item",
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                color:[
                    "#0f78f4",
                    "#dd536b",
                    "#9462b5",
                    "#a5a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series:[],
                emphasis: {
                    itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            echart:null,
        }
    },
    computed:{
        Option(){
            return this.isAxisChart? this.axisOption :this.normalOption
        }
    },


}
</script>
