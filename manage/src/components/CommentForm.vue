<template>
        <el-form ref="form" label-width="100px" :model="form" :inline="inline">
            <div class="form">
            <el-form-item v-for="item in formLabel" :key="item.Label" :label="item.label">
                <el-input v-if="item.type==='input'" :placeholder="'请输入'+item.label" v-model="form[item.model]" ></el-input>
                <el-switch v-if="item.type==='switch'"  v-model="form[item.model]"></el-switch>
                <el-select v-if="item.type==='select'"   :placeholder="'请选择'+item.label"  v-model="form[item.model]">
                    <el-option v-for="item in item.opt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                 <el-date-picker v-if="item.type==='date'" type="date" value-format="yyyy-MM-DD" placeholder="选择日期" v-model="form[item.model]"></el-date-picker>
            </el-form-item>
            </div>
            <el-form-item><slot></slot></el-form-item>
        </el-form>
        
</template>
<script>
export default ({
   name:'CommentForm',
   props:{
       formLabel:Array,
       form:Object,
       inline:Boolean
   },
   data(){
       return{
           
       }
   }
})
</script>
<style lang="less" scoped>
.form{
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    // justify-content : flex-end;
    align-content: center;
}
</style>
