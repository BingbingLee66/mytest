//
import './index.less';
import './index.css';
import'./test.js'

console.log(1,2);

document.getElementById('btn').onclick=function(){
    //懒加载
    //预加载
    import(/*webpackChunkName:'test',webpackPrefetch: true */ './test').then(({add})=>{
        console.log(add(1,2))
    })
}
if(module.hot){
    //hot为ture，开启hmr
    module.hot.accept('./index.js',function(){
        //监听print.js
        print()
    })
}
