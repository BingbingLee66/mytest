import Cookies from "js-cookie"
export default{
    state:{
        isCollapse:false,
        tabsList:[{
            path:'/home',
            name:'home',
            label:'首页',
            icon:'home',
        }],
        currentMenu:[],
        menu:[]
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse =!state.isCollapse
        },
        selectMenu(state,val){
            if(val.name!=='home'){
                state.currentMenu=val
                const result=state.tabsList.findIndex((item)=>item.name===val.name)
                if(result === -1){
                    state.tabsList.push(val)
                }else{
                    state.currentMenu=null
                }
            }
        },
        closetag(state,val){
            const result=state.tabsList.findIndex((item)=>item.name===val.name)
            state.tabsList.splice(result,1)

        },
        setMenu(state,val){
            
            state.menu=val
            Cookies.set('menu',JSON.stringify(val))
        },
        clearMenu(state){
            state.menu=[]
            Cookies.remove('menu')
        },
        addMenu(state,router){
            if(!Cookies.get('menu')){
                return
            }else{
               
                const menu=JSON.parse(Cookies.get('menu'))
                console.log(menu)
                state.menu=menu
                const menuArray=[]
                // console.log(menuArray)
                menu.forEach(item => {
                    if(item.children){
                        item.children=item.children.map( item=>{
                            item.component= ()=>import(`../../view/${item.url}`)
                            return item
                        }) 
                       menuArray.push(...item.children)   
                    //    console.log(item.children) 
                    }else{
                        item.component= ()=>import(`../../view/${item.url}`)
                        //  console.log(`../../view/${item.url}`)
                        // console.log(item)
                        menuArray.push(item)   
                    }
                });
                // console.log(menuArray)
                // console.log(router)
                // 路由的动态添加 
                menuArray.forEach(item=>{  
                    router.addRoute('Main',item)
                })
                // router.addRoute(menuArray)
            }

        }
    }
}