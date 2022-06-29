module.exports=function (id) {
    v.stitle("scratch作品")
    v.$data.workview = { id: 0 };
    get({
        url: 'work/info',
        data: { id: id }
    }, function (d) {
        let d2 = d.data
        if (d2) {
            d2.introduce2 = markdownToHtml(d2.introduce);
            v.workview = d2;
            v.comment.getcomment()
            v.item.getwork()
            v.title=d2.name+' by '+d2.nickname;
            v.stitle(d2.name+' by '+d2.nickname);
            setTimeout(()=>{
                $('#comment').bind('paste',v.paste);
            },100)
            
        } else { alert("服务器或网络错误") }
    })
}