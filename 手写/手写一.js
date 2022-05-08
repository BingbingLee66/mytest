//promise all实现
function all(arr) {
    //返回promise
    return new Promise((resolve, reject) => {
        let length = arr.length//传入promise个数
        let count = 0//进入fullfile的promise个数
        const result = []
        //当传递一个空数组时，返回一个fullfilled状态的promise
        if (length === 0) {
            return new Promise.resolve(arr)
        }
        for (let i = 0; i < length; i++) {
            arr[i].then(res => {
                result.push(res)//将每次结果放入result数组中
                count++//完成数+1
                if (count = length) {
                    resolve(result)
                }
            }).catch(e => {
                reject(e)//如果有错结束循环
            })
        }
    })
}
function race(arr) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < length; i++) {
            arr[i].then(res => {
                resolve(res)
            }).catch(e => {
                reject(e)
            })
        }
    })
}
//flat
function flatDeep(arr) {//打平一层
    return [].concat(...arr)
}
function flatDeep(arr, d = 1) {
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), []) : arr.slice()
}
