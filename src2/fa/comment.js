module.exports={
    send: function (r, id) {
        if (r) {
            this.reply(r);
            return;
        }
        let s = $('#comment').val();
        if (s) {
            post({
                url: "comment/",
                data: {
                    comment: s,
                    touser:v.comment.t[v.viewmode] == 2 ? v.studio.info.id : (v.comment.t[v.viewmode] == 3 ?v.forum.post.text.id: v.workview.id),
                    type: v.comment.t[v.viewmode],
                },
                p: "comment",

            }, (d) => {
                v.comment.text.comment=""
                console.log(d);
                alert("发送成功");
                v.comment.getcomment();
            })
        }
    },
    getcomment: () => {
        Vue.set(v.comment, 'comment', [])
        get({
            url: "comment/",
            data: {
                id:v.comment.t[v.viewmode] == 2 ? v.studio.info.id : (v.comment.t[v.viewmode] == 3 ?v.forum.post.text.id: v.workview.id),
                type: v.comment.t[v.viewmode],
                l:6,
                o:(v.comment.page-1)*6
            }
        }, (d) => {
           
            let d2 = d.data;
            if(Math.ceil(d2.num/6)<v.comment.page && d2.num!=0){
                v.comment.page=Math.ceil(d2.num/6);
            }
            for (let i in d2.comment) {
                d2.comment[i].comment = markdownToHtml(d2.comment[i].comment)
                d2.comment[i].time = other.date(d2.comment[i].time);
            }
            for (let i in d2.reply) {
                for (let j in d2.reply[i]) {
                    d2.reply[i][j].comment = d2.reply[i][j].comment ? markdownToHtml(d2.reply[i][j].comment) : ''
                    d2.reply[i][j].time = other.date(d2.reply[i][j].time);
                }
            }
            Vue.set(v.comment, 'comment', d2)
            setTimeout(()=>{
                viewer.update();
                scratchblocks.renderMatching('code.language-scratch3,code.language-scratch-blocks', {
                    style:     'scratch3',   // Optional, defaults to 'scratch2'.
                    languages: ['en'], // Optional, defaults to ['en'].
                    scale: 1,                // Optional, defaults to 1
                  });
            },300)
            console.log('获取评论', d)
        })
    },
    delete: async function (id) {
        if (!confirm("你确定要删除此评论吗")) {
            return;
        }
        post({
            url: "comment/delete",
            data: {
                id: id,
                type: v.comment.t[v.viewmode]
            },
            p: "commentdelete"
        }, (d) => {
            console.log(d);
            alert("删除成功");
            v.comment.getcomment();
        })
    },
    deletereply: async function (id) {
        if (!confirm("你确定要删除此评论吗")) {
            return;
        }
        post({
            url: "comment/reply/delete",
            data: {
                id: id,
                type: v.comment.t[v.viewmode]
            },
            p: "commentdelete"
        }, (d) => {
            console.log(d);
            alert("删除成功");
            v.comment.getcomment();
        })
    },
    reply: (r) => {
        let s = '#c-' + r;
        let s2 = $(s).val();
        // $(s).val('');
        if (s2) {
            post({
                url: "comment/reply",
                data: {
                    comment: s2,
                    toid: r,
                    type: v.comment.t[v.viewmode],
                    torid:v.comment.rid
                },
                p: "comment" + r,

            }, (d) => {
                console.log(d);
                v.comment.text[r]=""
                alert("发送成功");
                v.comment.getcomment();
            })
        }
    },
    showreply: function (id,rid){
        Vue.set(v.comment, 'replyid', id)
        if(rid) v.comment.rid=rid
        else v.comment.rid=null;
        setTimeout(()=>{
            $('#c-'+v.comment.replyid).unbind('paste');
            $('#c-'+id).bind('paste',v.paste);
        },10)
    },
    replyid: null,
    comment: {},
    text:{

    },
    page:1,
    rid:null,
    t: { 'user': 0, 'work': 1, 'studio': 2,'post':3 }
}