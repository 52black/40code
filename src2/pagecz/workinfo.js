module.exports=function (id) {
    v.$data.workview = { image: "6e2b0b1056aaa08419fb69a3d7aa5727.png" };
    delete waitRequest.cover;
    v.stitle("作品信息设置")
    get({
        url: 'work/info',
        data: { id: id }
    }, function (d) {
        if (!d.data) return;
        let d2 = d.data
        if (getQueryString('publish')) {
            d2.publish = 1;
        }
        (v.workview = d2)
        v.opensource = d2.opensource;
        v.publish = d2.publish;
        // location.href = "#page=workinfo&id=" + id;

    })
}