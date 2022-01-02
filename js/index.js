Vue.component('s-comment', {
    props: ['comment', 'host', 'detail', 'type', 'author'],
    template: `<div v-if="comment.comment" class="my-5">
    <div v-for="i in comment.comment.comment" class="my-6">
        <v-divider></v-divider>
        <div v-for="j in comment.comment.user[i.fromuser.toString()]" class="mt-2">
            <div>
                <a :href="'#page=user&id='+i.fromuser">
                    <v-avatar size=40 class="">
                        <img
                            :src="host.data+'/static/internalapi/asset/'+(j.head || '6e2b0b1056aaa08419fb69a3d7aa5727.png')">
                    </v-avatar>
                </a>
                <a :href="'#page=user&id='+i.fromuser">
                    <v-btn text color="accent" class="text-h6 ml-2" style="height: 100%">{{ j.nickname }}
                    </v-btn>
                </a>
                <span color="accent" class="text-h7 text--disabled ml-2 float-right">{{ i.time }}</span>
            </div>

            <br>
            <span color="accent" class="text-h6 ml-12" v-html="i.comment">{{ i.comment }}</span>
            <v-btn class="text--secondary float-left" text 
                v-on:click="comment.showreply(i.id)">
                <v-icon>mdi-reply</v-icon> 回复
            </v-btn>
            <v-btn class="text--secondary float-right" text v-if="detail.id==i.touser || detail.id==i.fromuser"
                v-on:click="comment.delete(i.id)">
                <v-icon>mdi-delete</v-icon> 删除
            </v-btn>
            <br>
            <span v-if="comment.replyid==i.id">
                <br>
                <s-c2 :comment="comment" :host="host" :detail="detail" :reply="i.id" class="mt"></s-c2>
            </span>

            <div v-if="i.replynum" class="pa-3 grey lighten-4 mt-2" style="border-radius:3px">
                <div v-for="k in comment.comment.reply[i.id.toString()]">
                    <div v-for="j in comment.comment.user[k.fromuser.toString()]" class="mt-2">
                        <a :href="'#page=user&id='+k.fromuser">
                            <v-avatar size=40 class="">
                                <img
                                    :src="host.data+'/static/internalapi/asset/'+(j.head || '6e2b0b1056aaa08419fb69a3d7aa5727.png')">
                            </v-avatar>
                        </a>
                        <a :href="'#page=user&id='+k.fromuser">
                            <v-btn text color="accent" class="text-h6 ml-2" style="height: 100%">{{ j.nickname }}
                            </v-btn>
                        </a>
                        <span color="accent" class="text-h7 text--disabled ml-2 float-right">{{ k.time }}</span><br>
                        <span color="accent" class="text-h6 ml-12" v-html="k.comment">{{ k.comment }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div v-else>
    此用户暂时没有评论哦
</div>`
})
Vue.component('s-c2', {
    props: ['comment', 'reply'],
    template: `<span>
    <v-textarea :id="reply?'c-'+reply:'comment'" filled label="评论" auto-grow value="" maxlength="500" counter>
    </v-textarea>
    <v-btn color="accent" class="pa-2 mx-auto" v-on:click="comment.send(reply)"   block>发送</v-btn>
</span>
`
})
Vue.component('s-workcard',{
    props:['work','user','host'],
    template:`<v-card :href="'#page=work&id='+work.id">
    <v-img :src="host.data+'/static/internalapi/asset/'+work.image" :aspect-ratio="4/3" class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,0) 80%, rgba(0,0,0,.6)">
        <span class="ma-2">
            <span>
                <v-icon color="white" size="16">mdi-eye</v-icon> {{ work.look }}
            </span>
            <span class="ml-1">
                <v-icon color="white" size="16">mdi-heart</v-icon> {{ work.like }}
            </span>
        </span>
    </v-img>
    <div class="text-truncate px-5 mt-3 mb-1 text-heading-6">{{ work.name }}</div>
    <span class="px-5" v-if="user">
        <v-avatar size="25">
            <img :src="host.data+'/static/internalapi/asset/'+(user.head || '6e2b0b1056aaa08419fb69a3d7aa5727.png')">
        </v-avatar>
        <span color="accent" class="text-subtitle-1 text--secondary text-truncate text-caption"
            :href="'#page=user&id='+work.author">{{
            user.nickname }}</span><br>
    </span>
    <span else><br></span>
</v-card>`
})
window.alert = (text, timeout) => {
    v.sb.text = text;
    v.sb.timeout = timeout || 3000;
    v.sb.show = 1;
};
var pagecz = {
    'index': function () {
        get({
            url: 'work/index'
        }, function (d) {
            v.$data.rows = d.data
        })
    },
    allwork: (a) => {
        v.work.all(a);
    },
    'sign': () => {
        setTimeout(() => {
            myCaptcha = _dx.Captcha(document.getElementById('c1'), {
                appId: '39248c3724c1b6b8f2b77645fde5b19e', //appId，在控制台中“应用管理”或“应用配置”模块获取
                apiServer: 'https://vip56.dingxiang-inc.com', // 请填写这个配置，按照下面“接入域名”所示!注意：末尾不要有斜杆！
                success: function (token) {
                    v.sign.token = token;
                }
            })
        }, 200)
    },
    'mywork': function () {
        get({
            url: 'work/my'
        }, function (d) {
            v.$data.mywork = d.data
        })
        location.href = "#page=mywork"
    },
    'work': function (id) {
        v.$data.workview = { id: 0 };
        get({
            url: 'work/info',
            data: { id: id }
        }, function (d) {
            let d2=d.data
            if(d2){
                d2.introduce2 = markdown.toHTML(d2.introduce);
                v.workview = d2;
                v.comment.getcomment()
            }else{alert("服务器或网络错误")}
        })
    },
    'workinfo': function (id) {
        v.$data.workview = { image: "6e2b0b1056aaa08419fb69a3d7aa5727.png" };
        delete waitRequest.cover;
        get({
            url: 'work/info',
            data: { id: id }
        }, function (d) {
            if (!d.data) return;
            let d2=d.data
            if(getQueryString('publish')){
                d2.publish=1;
            }
            (v.workview = d2)
            v.opensource = d2.opensource;
            v.publish = d2.publish;
            // location.href = "#page=workinfo&id=" + id;
            
        })
    },
    'user': function (id) {
        if (id == "0") {
            setTimeout(() => {
                location.href = "#page=user&id=" + v.detail.id
            }, 20)
            return;
        }
        v.$data.workview = { image: "6e2b0b1056aaa08419fb69a3d7aa5727.png" };
        get({
            url: 'user/info',
            data: { id: id }
        }, function (d) {
            console.log(d)
            if (!d.data) return;
            (v.$data.workview = d.data[0])
            // location.href = "#page=user&id=" + id;
            v.workview.introduce2 = v.workview.introduce ? markdown.toHTML(v.workview.introduce) : '当前用户暂时没有介绍哦';
            v.comment.getcomment()
            v.user.getwork(4)
        })
    },
    'account': function (id) {

    },
    'message': (id) => {
        v.user.getmessage()
    },
    'flist': (id) => {
        v.user.getlist(id)
    },
};

let functiona = {
    rules: [
        value => {
            let f = new FormData();
            console.log(value)
            if (value.size > 500000) return '图片必须小于500KB';
            if (['image/jpeg', 'image/png', 'image/gif', 'image/bmp'].indexOf(value.type) == -1) return '不支持此格式的图片'
            function upa(data) {
                v.waitRequest.cover = 1;
                $.ajax({
                    url: apihost + 'work/uploads',
                    method: 'POST',
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    dataType: 'json',
                    // 图片上传成功
                    success: function (result1) {
                        let k = result1.data[2][0][1].Key.split('/');
                        v.detail.image = v.workview.image = k[k.length - 1];
                        value = undefined;
                        // delete waitRequest.cover;
                        v.waitRequest.cover = -1;
                        // console.log(k,v.workview.imgpre)
                    },
                    error: function () {
                        alert("图片上传失败")
                        v.waitRequest.cover = -1;
                        delete v.waitRequest.cover;
                    }
                });
            }
            f.append("image", new Blob([value], { type: value.type }))
            upa(f)
            // return false;
        }
        // value => !value || value.size < 2000000 || '图片必须小于2MB',
    ],
    host: {
        data: 'https://newsccode-1302921490.cos.ap-shanghai.myqcloud.com',
        scratch: 'https://newsccode-1302921490.cos-website.ap-shanghai.myqcloud.com'
    },
    work: {
        checkbox: [],
        new: function () {
            get({
                url: 'work/new',
                p: 'newwork'
            }, function (d) {
                location.href = "/other/scratch.html#id=" + d.info.insertId;
            })
        },
        update: function () {
            let d = $("[name='editinfo']"), data = {};
            data.name = $("[t='name']").val();
            data.introduce = $("[t='introduce']").val();
            data.opensource = $("[t='opensource']")[0].checked;
            data.publish = $("[t='publish']")[0].checked;
            data.image = v.workview.image;
            data.id = v.$data.workview.id;
            console.log(data)
            post({
                url: 'work/info/update',
                data: data,
                p: 'updatework'
            }, function (d) {
                console.log(d)
                location.href = "#page=work&id=" + v.$data.workview.id;
                // v.$data.qh('work', v.$data.workview.id)
            })
        },
        return: function () {
            location.href = "#page=work&id=" + v.$data.workview.id;
            // v.$data.qh('work', v.$data.workview.id)
        },
        all: function (a) {
            if (a) {
                location.href = "#page=allwork" + a
            }
            setTimeout(() => {
                get({
                    url: 'work/all',
                    data: {
                        tags: getQueryString('tags'),
                        user: getQueryString('user'),
                        name: getQueryString('name'),
                    }
                }, function (d) {
                    v.$data.rows = [{
                        title: '作品',
                        worklist: d.data.worklist,
                        userlist: d.data.userlist,
                    }]
                }), 100
            })
        },
        search: function () {
            location.href = "#page=allwork&name=" + $('#sname').val() + '&user=' + $('#sauthor').val()
            // v.work.all()
        },
        like: () => {
            post({
                url: "work/like" + (v.workview.islike ? '/cancel' : ''),
                data: {
                    id: v.workview.id
                }
            }, (d) => {
                alert(d.msg)
                v.workview.islike ? v.workview.like-- : v.workview.like++;
                v.workview.islike = !v.workview.islike;
            })
        },
    },
    items: [

        {
            title: '我的主页',
            c: function () {
                // v.$data.qh('user', v.detail.id);
                location.href = "#page=user&id=" + v.detail.id
            },
        },
        {
            title: '我的作品',
            c: function () {
                // v.$data.qh('mywork');
                location.href = "#page=mywork"
            }
        },
        {
            title: '账号设置',
            c: function () {
                // v.$data.qh('account');
                location.href = "#page=account"
            }
        },
        {
            title: '退出登录',
            c: function () {
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                console.log('清除cookie')
                location.href = ""
            }
        },
    ],
    pw: value => {
        const pattern = /^[0-9]*$/
        if (!(!pattern.test(value) || value.length > 9)) return '纯数字密码必须大于8位'
        if (value.length < 6) return '密码必须大于6位'
    },
    sign: {
        email: [
            value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || '请输入正确的邮箱'
            },
        ],
        l: function (n) {
            let d = ['login', 'signup']
            if (!v.sign.token) {
                alert("请先完成验证码")
                return;
            }
            get({
                url: 'user/' + d[n],
                data: {
                    email: $('#email').val(),
                    pw: $('#pw').val(),
                    t2: v.sign.token
                },
                p: 'sign'
            },
                function (data) {
                    pagecz.sign()
                    if (data.code == 1) {
                        if (n == 0) {
                            location.href = "#"
                            alert(data.msg)
                            setCookie('token', data.token, 3)
                            getuserinfo()
                        } else {
                            alert(data.msg)
                        }
                    } else {
                        alert(data.msg, 5000)
                    }
                })
        },
        data: {
            email: '',
            pw: ''
        }
    },
    account: {
        n: function () {
            get({
                url: 'user/change/password',
                data: {
                    npw: $('#a_npw').val(),
                    opw: $('#a_opw').val()
                },
                p: 'account'
            },
                function (data) {
                    alert(data.msg)
                    getuserinfo()
                    location.href = ""
                })
        },
        l: function (n) {
            post({
                url: 'user/change/info',
                data: {
                    data: $('#i-input-' + n).val(),
                    t: n
                },
                p: 'changeinfo'
            }, function (d) {
                alert(d.msg)
                location.href = ""
            })
        },
        head: function () {
            if (!v.detail.image) {
                alert("请选择图片并等待上传完毕后再继续操作")
                return;
            }
            post({
                url: 'user/change/info',
                data: {
                    data: v.detail.image,
                    t: 2
                },
                p: 'changeinfo'
            }, function (d) {
                alert(d.msg)
                location.href = ""
            })
        },
    },
    comment: {
        send: function (r) {
            if (r) {
                this.reply(r);
                return;
            }
            if ($('#comment').val()) {
                post({
                    url: "comment/",
                    data: {
                        comment: $('#comment').val(),
                        touser: v.workview.id,
                        type: { 'user': 0, 'work': 1 }[v.viewmode],
                    },
                    p: "comment",

                }, (d) => {
                    console.log(d);
                    alert("发送成功");
                    v.comment.getcomment();
                })
            }
        },
        getcomment: () => {
            get({
                url: "comment/",
                data: {
                    id: v.workview.id,
                    type: { 'user': 0, 'work': 1 }[v.viewmode],
                }
            }, (d) => {
                let d2 = d.data;
                for (let i in d2.comment) {
                    d2.comment[i].comment = markdown.toHTML(d2.comment[i].comment)
                    d2.comment[i].time = other.date(d2.comment[i].time);
                }
                for (let i in d2.reply) {
                    for (let j in d2.reply[i]) {
                        d2.reply[i][j].comment = d2.reply[i][j].comment ? markdown.toHTML(d2.reply[i][j].comment) : ''
                        d2.reply[i][j].time = other.date(d2.reply[i][j].time);
                    }
                }
                Vue.set(v.comment, 'comment', d2)
                console.log('获取评论', d)
            })
        },
        delete: function (id) {
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
        reply: (r) => {
            let s = '#c-' + r;
            if ($(s).val()) {
                post({
                    url: "comment/reply",
                    data: {
                        comment: $(s).val(),
                        toid: r,
                        type: { 'user': 0, 'work': 1 }[v.viewmode],
                    },
                    p: "comment" + r,

                }, (d) => {
                    console.log(d);
                    alert("发送成功");
                    v.comment.getcomment();
                })
            }
        },
        showreply: (id) => {
            Vue.set(v.comment, 'replyid', id)
        },
        replyid: null,
        comment: {},
        t: { 'user': 0, 'work': 1 }
    },
    user: {
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
                }
            }, (d) => {
                let d2 = d.data
                for (let i in d2) {
                    d2[i].time = other.date(d2[i].time);
                }
                v.user.message = d2
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
                    type: v.user.flisttype
                }
            }, (d) => {
                v.user.flist = d.data
            })
        },
        flist: [],
        message: {},
        flisttype: !!getQueryString('type') - 0,
    },
}
let functiono = {
    workview: { image: "6e2b0b1056aaa08419fb69a3d7aa5727.png" },
    detail: (getCookie('token') === undefined) ? undefined : 0,
    token: getCookie('token'),
    viewmode: 'index',
    qh: function (a, id) {
        // v.$data.viewmode = a
        // pagecz[a] && pagecz[a](id);
    },
    qh3: function (a, id) {
        v.$data.viewmode = a
        pagecz[a] && pagecz[a](id);
    },
    qh2: () => {
        let d = ['index', 'sign', 'account', 'mywork', 'work', 'workinfo', 'user', 'message', 'allwork', 'flist'], q = getQueryString('page');
        if (!q) {
            q = 'index'
        } else if (d.indexOf(q) != -1) {
        } else {
            q = '404'
        }
        v.$data.qh3(q, getQueryString('id'))
    },
    sb: {
        show: false,
        text: '',
        timeout: 2000,
    },
    publish: 0,
    opensource: 0,
    rows: { "data": [] },
    show: { '0': 0, '1': 0, '2': 0 },
    show0: 0,
    show1: 0,
    show2: 0,
    mywork: {},
    waitRequest: { cover: 0 },
    worklist: 0,
}

var other = {
    date: (d) => {
        function p(num) {
            return (Array(2).join('0') + num).slice(-2);
        }
        let date = "", st = new Date(d * 1000), et = new Date();
        if (st.getYear() == et.getYear()) {
            if ((st.getMonth() == et.getMonth() && st.getDate() == et.getDate())) {
                date = (st.getHours()) + ':' + p(st.getMinutes()) + ' ';
            } else {
                date = (st.getMonth() + 1) + '-' + st.getDate() + ' ';
            }
        } else {
            date = (st.getYear() + 1900) + '-' + (st.getMonth() + 1) + '-' + st.getDate() + ' '
        }
        return date;
    }
}

var v = new Vue({
    el: '#app',
    data: Object.assign(functiona, functiono, other),
    vuetify: new Vuetify({
        theme: {
            themes: {
                light: {
                    primary: '#3f51b5',
                    secondary: '#b0bec5',
                    accent: '#8c9eff',
                    error: '#b71c1c',
                },
            },
        }
    }),
})

v.qh2();
window.addEventListener('hashchange', function (event) {
    console.log(event);
    v.qh2();
})

$(document).ready(function () {
    getuserinfo()
    setInterval(() => { getuserinfo() }, 10000)
});
