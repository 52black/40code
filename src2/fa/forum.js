module.exports={
    list:[],
    studio:{},
    sending:0,
    getlist:()=>{
        get({
            url:'forum/list',
            data:{
                sid:getQueryString('sid'),
                page:getQueryString('page') || 1
            }
        }, (d)=>{
            if(d.code==-1){
                dialog(d.msg)
                return;
            }
            v.forum.list=d.data.list;
            v.forum.studio=d.data.studio;
            v.forum.user=d.data.user;
        })
    },
    get:()=>{
        get({
            url:'forum/post',
            data:{
                sid:getQueryString('sid'),
                page:getQueryString('page') || 1
            }
        }, (d)=>{
            if(d.code==-1){
                dialog(d.msg)
                return;
            }
            
        })
    },
    send:()=>{
        if($('#ftitle').val().length<3 || $('#fcontext').val().length<3){
            alert('标题和正文必须大于2个字')
            return;
        }
        v.forum.sending=1;
        post({
            url:'forum/new',
            data:{
                title:$('#ftitle').val(),
                context:$('#fcontext').val(),
                sid:getQueryString('sid')
            }
        },function(d){
            v.forum.sending=0;
            v.forum.dialog = false;
            location.href += '&t'
            alert(d.msg)
        })
    },
    post:{
        text:{},
        studio:{},
        author:{},
        get:()=>{
            get({
                url:'forum/post',
                data:{
                    id:getQueryString('id')
                }
            },function(d){
                v.forum.post.text=d.data.text;
                v.forum.post.text.context2=markdownToHtml(v.forum.post.text.context)
                v.forum.post.studio=d.data.studio;
                v.forum.post.author=d.data.author;
                v.comment.getcomment()
            })
        }
    }
}