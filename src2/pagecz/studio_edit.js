module.exports=function (id) {
    v.stitle("工作室设置")
    Vue.set(v.studio, 'info', null)
    get({
        url: 'studio/info',
        data: { id: id }
    }, function (d) {
        if (!d.data) return;
        Vue.set(v.studio, 'info', d.data)
    })

}