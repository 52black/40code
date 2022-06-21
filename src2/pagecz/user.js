module.exports=function (id) {
    v.stitle("用户");
    v.user.edit=0;
    v.$data.workview = { image: "6e2b0b1056aaa08419fb69a3d7aa5727.png" };
    get({
        url: 'user/info',
        data: { id: id }
    }, function (d) {
        console.log(d)
        if (!d.data) return;
        v.stitle(d.data[0] && d.data[0].nickname);
        (v.$data.workview = d.data[0])
        // location.href = "#page=user&id=" + id;
        v.workview.introduce2 = v.workview.introduce ? markdownToHtml(v.workview.introduce) : '当前用户暂时没有介绍哦';
        v.comment.getcomment()
        v.user.getwork(6)
        setTimeout(()=>{
            $('#comment').bind('paste',v.paste);
        },100)
    })
}