module.exports=function (id) {
    v.stitle("工作室")
    Vue.set(v.studio, 'info', null)
    Vue.set(v.studio, 'userlist', null)
    get({
        url: 'studio/info',
        data: { id: id }
    }, function (d) {
        if (!d.data) return;
        Vue.set(v.studio, 'info', d.data)
        v.studio.info.introduce2 = v.studio.info.introduce ? markdownToHtml(v.studio.info.introduce) : '当前工作室暂时没有介绍哦';
        v.studio.chose = v.studio.chose.toString();
        v.comment.getcomment()
        v.studio.getwork()
        v.studio.getuser()
        setTimeout(()=>{
            $('#comment').bind('paste',v.paste);
        },100)
    })
}