module.exports=function () {
    v.stitle("我的作品")
    get({
        url: 'work/my'
    }, function (d) {
        v.$data.mywork = d.data
    })
    location.href = "#page=mywork"
}