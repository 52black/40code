module.exports=function () {
    v.stitle("我的工作室")
    get({
        url: 'studio/my'
    }, function (d) {
        Vue.set(v.studio, 'my', d.data)
    })
}