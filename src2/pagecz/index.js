module.exports=function () {
    v.stitle("40code少儿编程社区")
    get({
        url: 'work/index'
    }, function (d) {
        v.$data.rows = d.data
    })
    get({
        url: 'user/clist'
    }, function (d) {
        v.user.list = d.data
    })
    get({
        url: 'studio/index'
    }, function (d) {
        v.studio.ilist = d.data
    })
}