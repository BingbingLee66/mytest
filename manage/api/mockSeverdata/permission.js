import Mock from "mockjs";
export default{
    getMenu:config=>{
        const{username,password}=JSON.parse(config.body)
        // console.log(JSON.parse(config.body));
        if(username==='BingBing'||username==='user'){
            if(username==='BingBing'&&password==="123456"){
                return {
                    code:20000,
                    data:{
                        menu:[
                            {
                                path:'/home',
                                name:'home',
                                label:'首页',
                                icon:'s-home',
                                url:'home/index'
                            },
                             {
                                path:'/mall',
                                name:'mall',
                                label:'商品管理',
                                icon:'video-play',
                                url:'mall/index'
                            },
                            {
                                path:'/user',
                                name:'user',
                                label:'用户管理',
                                icon:'user',
                                url:'User/index'
                            },
                            {
                                label:'其他',
                                icon:'location',
                                children:[
                                    {
                                        path:'/page1',
                                        name:'page1',
                                        label:'页面1',
                                        icon:'setting',
                                        url:'other/PageOne.vue'  
                                    },
                                     {
                                        path:'/page2',
                                        name:'page2',
                                        label:'页面2',
                                        icon:'setting',
                                        url:'other/PageTwo.vue'  
                                    }
                                ]
                            }
                        ],
                        token:Mock.Random.guid(),
                        message:"获取成功"
                    }
                }
            } else if (username === "user" && password === "123456") {
                return {
                  code: 20000,
                  data: {
                    menu: [
                      {
                        path: "/home",
                        name: "home",
                        label: "首页",
                        icon: "s-home",
                        url: "home/index"
                      },
                      {
                        path: "/mall",
                        name: "mall",
                        label: "商品管理页",
                        icon: "video-play",
                        url: "mall/index"
                      }
                    ],
                    token: Mock.Random.guid(),
                    message: "获取成功"
                  }
                };
            } else {
                return {
                  code: -999,
                  data: {
                    message: "密码错误"
                  }
                };
            }   
            }else {
                return {
                  code: -999,
                  data: {
                    message: "用户不存在"
                  }
                };
              }
        }
    }
