module.exports={
    postmessage:()=>{
        v.user.pm.show=1;
    },
    pm:{
        show:0,
        send:()=>{
            post({
                url:'user/private',
                data:{
                    'id':v.user.pm.id,
                    'text':v.user.pm.text
                },
                p:'pm'
            },()=>{
                v.user.pm.show=0;
            })
        },
        id:'',
        text:''
    },
    getwork: (l) => {
        get({
            url: "work/user",
            data: {
                id: v.workview.id,
                l: l,
            }
        }, (d) => {
            v.worklist = d.data
            console.log('获取评论', d)
        })
    },
    getmessage: () => {
        get({
            url: "user/message",
            data: {
                l:20,
                o:(v.user.msgpage-1)*20
            }
        }, (d) => {
            let d2 = d.data
            for (let i in d2) {
                d2[i].time = other.date(d2[i].time);
            }
            v.user.message = d2
            Vue.set(v.user, 'msgtotal', d.num)
            console.log('获取消息', d)
            v.detail.msgnum = 0;
        })
    },
    follow: () => {
        post({
            url: "user/follow" + (v.workview.followu ? '/cancel' : ''),
            data: {
                id: v.workview.id
            }
        }, (d) => {
            alert(d.msg)
            v.workview.followu = !v.workview.followu
        })
    },
    getlist: (id) => {
        get({
            url: "user/flist",
            data: {
                id: id,
                type: getQueryString('f') ? 1 : 0
            }
        }, (d) => {
            v.user.flist = d.data
        })
    },
    signin: () => {
        post({
            url: 'user/signin',
            p: 'signin'
        }, (d) => {
            alert(d.msg, 10000)
        })
    },
    flist: [],
    list: [],
    message: {},
    msgpage:1,
    msgtotal:0,
    flisttype: !!getQueryString('type') - 0,
    delmsg:(id)=>{
        post({
            url:'/user/message/delete',
            data:{
                id:id
            }
        },()=>{
            v.user.getmessage()
        })
    },
    edit:0
}