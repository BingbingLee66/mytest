<template>
    <div class="manage">
        <el-dialog :title="operateType==='add' ? '新增用户' :'更新用户'" :visible.sync="isShow">
            <CommentForm :formLabel="operateFormLabel" :form="operateForm" :line="true" ref="form"></CommentForm>
            <div slot="footer" class="dialog-footer">
                <el-button @click="Show">取消</el-button>
                <el-button type="primary" @click="confirm"> 确定</el-button>
            </div>
        </el-dialog>
        <div class="manage-header" >
            <el-button type="primary" @click="addUser"> 增加</el-button>    
            <div  class="manage-header">       
             <CommentForm :formLabel="formLabel" :form="searchForm" :line="true" ref="form">                 
            </CommentForm>
            <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
            </div>    
        </div> 
        <comment-table 
        style="height:450px"
        :tableData="tableData" 
        :tableLabel="tableLabel" 
        :config="config"
        @changePage="getList()"
        @edit="editUser"
        @del="delUser"></comment-table>  

    </div>
   
</template>

<script>
import CommentForm from "../../src/components/CommentForm.vue"
import CommentTable from "../../src/components/CommentTable.vue"
// import { getUser } from "../../api/data"
export default {
    name:'User',
    data(){
        return{ 
            operateType:'add',
            isShow:false,
            operateFormLabel:[
                {
                    model:'name',
                    label:'姓名',
                    type:'input'
                },
                {
                    model:'age',
                    label:'年龄',
                    type:'input'                
                },
                {
                    model:'sex',
                    label:'性别',
                    type:'select',
                    opt:[
                        {
                            label:'男',
                            value:1
                        },
                        {
                            label:'女',
                            value:0
                        },    
                    ]        
                },
                {
                    model:'addr',
                    label:'地址',
                    type:'input'                
                },
                {
                    model:'birth',
                    label:'出生日期',
                    type:'date'                
                },
            ],
            operateForm:{
                name:'',
                addr:'',
                birth:'',
                sex:'',
                agg:'',
            },
            formLabel:[
                {
                    model:'keyword',
                    label:'',
                    type:'input'
                }
            ],
            searchForm:{
                keyword:''
            },
            tableData:[

            ],
            tableLabel:[
                {
                    prop:'name',
                    label:'姓名'
                },
                 {
                    prop:'age',
                    label:'年龄'
                },
                 {
                    prop:'sexLabel',
                    label:'性别'
                },
                 {
                    prop:'birth',
                    label:'出生日期',
                    width:200
                },
                 {
                    prop:'addr',
                    label:'地址',
                    width:320
                },
            ],
            config:{
                page:1,
                total:30
            }
        }
    },
    components:{
        CommentForm,
        CommentTable,
    },
    methods:{
        confirm(){
            if(this.operateType==='edit'){
                this.$axios.post('user/edit',this.operateForm).then(res=>(
                    console.log(res),
                    this.isShow=false,
                    this.$message({
                        type:'success',
                        message:'修改完成'
                    }),
                    this.getList()

                ))
            }else{
                 this.$axios.post('user/add',this.operateForm).then(res=>(
                    console.log(res),
                    this.isShow=false,
                    this.$message({
                        type:'success',
                        message:'添加成功'
                    }),
                    this.getList()
                ))
            }
        },
        Show(){
            this.isShow=false
            if(this.operateType==='edit'){
                this.$message({
                        type:'info',
                        message:'已取消修改'
                    })
            }else{
                  this.$message({
                        type:'info',
                        message:'已取消添加'
                    })
            }
        },
        addUser(){
            this.isShow=true
            this.operateType='add'
            this.operateForm={
                name:'',
                addr:'',
                birth:'',
                sex:'',
                agg:'',
            }
        },
        getList(name=''){
            this.loading=true         
            name?(this.config.page=1):''
            console.log(name)
            this.$axios.get('user/getUser',{
                params:{ name,page:this.config.page}
                }) 
                .then(({data:res})=>{
                    // console.log(res.List,'res')
                    this.tableData=res.List.map(item=>{
                    item.sexLabel=item.sex===0?'女' :'男'
                    return item
                    })
                    this.config.total=res.count
                    this.loading=false 
                }
            )

        },
        editUser(row){
            this.isShow=true
            this.operateType='edit'
            this.operateForm={...row}
        },
        delUser(row){
            this.$confirm('此操作为永久删除,是否继续?','提示',{
                confirmButtonText:"确定",
                cancelButtonText:"取消",
                type:"warning"
            }).then(()=>{
                const id=row.id  
                console.log(id)
                this.$axios.post("user/del",{
                    params:{id}   
                }).then(()=>{
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    })
                    this.getList()
                })
            }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })   
        }
    },
    created(){
        this.getList()
    }


}
</script>
