Vue.component('s-comment', {
    props: ['comment', 'host', 'detail', 'type', 'author'],
    template: `<div v-if="comment.comment" class="my-5">
    <div v-for="i in comment.comment.comment" class="my-6">
        <div v-for="j in comment.comment.user[i.fromuser.toString()]" class="mt-2">
            <div>
                <v-row  no-gutters>
                    <span style="flex: 0 0 5px;"></span>
                    <span style="flex: 0 0 10px;" class="mt-1">
                        <a :href="'#page=user&id='+i.fromuser">
                            <v-avatar size=40 class="">
                                <img
                                    :src="host.data+'/static/internalapi/asset/'+(j.head || '6e2b0b1056aaa08419fb69a3d7aa5727.png')">
                            </v-avatar>
                        </a>
                    </span>
                    <span style="flex: 0 0 10px;"></span>
                    <span style="flex: 0 0 calc( 100% - 60px)">
                        <v-row no-gutters>
                            <v-col cols="12">
                                <a :href="'#page=user&id='+i.fromuser">
                                    {{ j.nickname }} <span style="color:#888;font-size: 7px;">{{ i.time }}</span>
                                </a>
                                <a :href="\`#page=studio&id=\${comment.comment.studio[j.studio].id}\`"
                                    v-if="comment.comment.studio[j.studio]">
                                    <v-btn  style="text-transform: none!important;"
                                        :color="comment.comment.studio[j.studio].color || 'green'" class="sd tg" small>
                                        <span style="color:white">{{ comment.comment.studio[j.studio].name }}</span>
                                    </v-btn>
                                </a>
                            </v-col>
                            <v-col cols="12">
                                <span color="accent" class="pm" v-html="i.comment"></span>
                                <v-btn class="text--secondary float-left" text small v-on:click="comment.showreply(i.id)" style="margin-top: -15px;">
                                    <v-icon>mdi-reply</v-icon> 回复
                                </v-btn>
                                <v-btn class="text--secondary float-right" text small style="margin-top: -15px;"
                                    v-if="detail.id==i.touser || detail.id==i.fromuser"
                                    v-on:click="comment.delete(i.id)">
                                    <v-icon>mdi-delete</v-icon> 删除
                                </v-btn>
                                <br>
                                <span v-if="comment.replyid==i.id">
                                    <br>
                                    <s-c2 :comment="comment" :host="host" :detail="detail" :reply="i.id" class="mt">
                                    </s-c2>
                                </span>

                                
                            </v-col>
                        </v-row>
                    </span>

                </v-row>
            </div>
            <div v-if="i.replynum">
                <div v-for="k in comment.comment.reply[i.id.toString()]">
                    <div v-for="j in comment.comment.user[k.fromuser.toString()]" class="mt-2">

                        <v-row no-gutters>
                            <span style="flex: 0 0 35px;"></span>
                            <span style="flex: 0 0 10px;" class="mt-1">
                                <a :href="'#page=user&id='+i.fromuser">
                                    <v-avatar size=40 class="">
                                        <img
                                            :src="host.data+'/static/internalapi/asset/'+(j.head || '6e2b0b1056aaa08419fb69a3d7aa5727.png')">
                                    </v-avatar>
                                </a>
                            </span>
                            <span style="flex: 0 0 15px;"></span>
                            <span style="flex:0 0 calc( 100% - 95px )">
                                <v-row no-gutters>
                                    <v-col cols="12">
                                        <a :href="'#page=user&id='+k.fromuser">
                                            {{ j.nickname }} <span style="color:#888;font-size: 7px;">{{ k.time }}</span>
                                        </a>
                                        <a :href="\`#page=studio&id=\${comment.comment.studio[j.studio].id}\`"
                                            v-if="comment.comment.studio[j.studio]">
                                            <v-btn  style="text-transform: none!important;"
                                                :color="comment.comment.studio[j.studio].color || 'green'" class="sd tg" small>
                                                <span style="color:white">{{ comment.comment.studio[j.studio].name }}</span>
                                            </v-btn>
                                        </a>
                                    </v-col>
                                    <v-col cols="12">
                                        <span color="accent" class="pm" v-html="k.comment"></span>
                                        <v-btn class="text--secondary float-left" text small v-on:click="comment.showreply(i.id,k.id)" style="margin-top: -15px;">
                                            <v-icon>mdi-reply</v-icon> 回复
                                        </v-btn>
                                        <v-btn class="text--secondary float-right" text small
                                            v-if="detail.id==k.fromuser" style="margin-top: -15px;"
                                            v-on:click="comment.deletereply(k.id)">
                                            <v-icon>mdi-delete</v-icon> 删除
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </span>
                            
                            
                        </v-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-center my-3" v-if="comment.comment.num>0">
        <v-pagination v-model="comment.page" :length="Math.ceil(comment.comment.num/6)" :total-visible="7">
        </v-pagination>
    </div>
</div>
<div v-else>
    此用户暂时没有评论哦
</div>`
})
Vue.component('s-c2', {
    props: ['comment', 'reply'],
    template: `<span>
    <v-textarea clearable v-model="comment.text[reply?'c-'+reply:'comment']"
    clear-icon="mdi-close-circle" :id="reply?'c-'+reply:'comment'" filled label="评论" auto-grow :value="comment.text[reply?'c-'+reply:'comment']" maxlength="500" counter>
    </v-textarea>
    <v-btn class="pa-2 mx-auto sd" v-on:click="comment.send(reply)"  color="accent"  block>发送</v-btn>
</span>
`
})
Vue.component('s-workcard', {
    props: ['work', 'user', 'host', 'my'],
    template: `
    <v-card class=" mb-3 sd">
    <v-card :href="'#page=work&id='+work.id" elevation="0">
        <v-img :src="host.data+'/static/internalapi/asset/'+work.image" :aspect-ratio="4/3"
            class="white--text align-end" gradient="to bottom, rgba(0,0,0,0) 80%, rgba(0,0,0,.6)">
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
        <span class="px-5 text-truncate text-caption row" v-if="user">
            <span class="col-12 text-truncate">
                <v-avatar size="25">
                    <img
                        :src="host.data+'/static/internalapi/asset/'+(user.head || '6e2b0b1056aaa08419fb69a3d7aa5727.png')">
                </v-avatar>
                <span class="text-subtitle-1 text--secondary "
                    :href="'#page=user&id='+work.author">{{
                    user.nickname }}</span><br>
                </a>
                <span else><br></span>
            </span>
    </v-card>
    <span v-if="my">
        <v-btn color="green" text v-if="work.publish" depressed block text tile>已发布
        </v-btn>
        <v-btn color="red" text v-else depressed block text tile>未发布
        </v-btn>
        <span>
            <v-btn color="accent" class="" v-if="my" :href="'/other/scratch.html#id='+work.id" target="_blank"
                depressed text block>继续创作
            </v-btn>
            <v-btn color="accent" class="" v-if="my" v-on:click="my.del(work.id)" target="_blank"
                depressed text block>删除
            </v-btn>
        </span>
        <br>
    </span>
</v-card>
    `
})
Vue.component('s-usercard', {
    props: ['user', 'host'],
    template: `
    <v-card :href="'#page=user&id='+user.id" class="py-2 sd">
  <v-row class="pa-5">
    <v-col cols="4">
      <v-avatar size="40">
        <img :src="host.data+'/static/internalapi/asset/'+(user.head || '6e2b0b1056aaa08419fb69a3d7aa5727.png')" />
      </v-avatar>
    </v-col>
    <v-col cols="8">
      <span color="accent" class="
          text-h5 text--secondary text-truncate text-caption
          
          pr-3
          ">
        <div class="row">
          <div class="col-12 text-truncate">
            {{ user.nickname }}
          </div>
        </div>
        <span class="text-truncate"></span>
        <!--<a :href="\`#page=studio&id=\${studio.id}\`" v-if="studio">
          <v-chip class="ma-2" :color="studio.color || 'green'" text-color="white">
              {{ studio.name }}
          </v-chip>
          </a>-->


        <span class="text--disabled">金币:</span>
        <a style="color:#FFC107">{{ user.coins }}</a>
      </span>
    </v-col>
  </v-row>
</v-card>
  
`
})
Vue.component('s-studiocard', {
    props: ['studio', 'host'],
    template: `
    <v-card :href="'#page=studio&id='+studio.id" class="rounded-lg py-2 sd">

    <v-row class="pa-5">
        <v-col cols="4">
            <v-avatar size="50">
                <img
                    :src="host.data+'/static/internalapi/asset/'+(studio.head || '6e2b0b1056aaa08419fb69a3d7aa5727.png')" />
            </v-avatar>
        </v-col>
        <v-col cols="8">
            <span color="accent" class="
            text-h5 text--secondary text-truncate text-caption
            pr-3
            ">
                <div class="row">
                    <div class="col-12 text-truncate">
                        {{ studio.name }}
                    </div>
                </div>

                <span class="text--disabled">作品:</span>
                <a style="color:#555">{{ studio.worknum }}</a>
                <span class="text--disabled">成员:</span>
                <a style="color:#555">{{ studio.membernum }}</a>
            </span>

        </v-col>
    </v-row>
</v-card>
  
`
})
window.alert = (text, timeout) => {
    v.sb.text = text;
    v.sb.timeout = timeout || 3000;
    v.sb.show = 1;
};
window.dialog = (text) => {
    v.sb2.text = text;
    v.sb2.show = 1;
}
var markdownToHtml=(text)=>{
    return marked.parse(DOMPurify.sanitize(text));
}
var pagecz = {
    'index': function () {
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
    },
    "search":(id)=>{
        Vue.set(v.search,'type',getQueryString('type'))
        v.search.page= (+getQueryString('p') || 1)
        v.search.type= ((+getQueryString('type'))+1 ? +getQueryString('type') :0)
        Vue.set(v.search,'work',{})
        Vue.set(v.search,'studio',{})
        Vue.set(v.search,'user',{})
        Vue.set(v.search,'s2',getQueryString('s'))
        Vue.set(v.search,'name',getQueryString('name'))
        Vue.set(v.search,'author',getQueryString('author'))
        post({
            url:"/search/",
            data:{
                name:getQueryString('name'),
                author:getQueryString('author'),
                type:getQueryString('type'),
                s:getQueryString('s')||0,
                page:v.search.page
            }
        },function(d){
            let t=['work','user','studio']
            Vue.set(v.search,t[+getQueryString('type')],d.data)
            Vue.set(v.search,'num',d.data.num)
            Vue.set(v.search,'time',d.data.time)
            if(Math.ceil(v.search.num/12)<v.search.page && v.search.num!=0){
                v.search.page=Math.ceil(v.search.num/12);
            }
        })
    },
    'sign': () => {
        v.stitle("登录注册")
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
        v.stitle("我的作品")
        get({
            url: 'work/my'
        }, function (d) {
            v.$data.mywork = d.data
        })
        location.href = "#page=mywork"
    },
    'mystudio': function () {
        v.stitle("我的工作室")
        get({
            url: 'studio/my'
        }, function (d) {
            Vue.set(v.studio, 'my', d.data)
        })
    },
    'work': function (id) {
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
                v.title=d2.title+' by '+d2.nickname;
                setTimeout(()=>{
                    $('#comment').bind('paste',v.paste);
                },100)
                
            } else { alert("服务器或网络错误") }
        })
    },
    'workinfo': function (id) {
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
    },
    'user': function (id) {
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
    },
    'account': function (id) {
        getuserinfo()
        v.stitle("账号设置")
    },
    'message': (id) => {
        v.stitle("消息")
        v.user.getmessage()
    },
    'flist': (id) => {
        if(getQueryString('f')) v.stitle("关注列表")
        else v.stitle('粉丝列表')
        v.user.getlist(id)
    },
    'studio': function (id) {
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
    },
    'studio_edit': function (id) {
        v.stitle("工作室设置")
        Vue.set(v.studio, 'info', null)
        get({
            url: 'studio/info',
            data: { id: id }
        }, function (d) {
            if (!d.data) return;
            Vue.set(v.studio, 'info', d.data)
        })

    },
    'forum':()=>{
        v.forum.getlist()
    },
    'post':()=>{
        v.forum.post.get()
    }
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
        del: (id) => {
            if (!confirm("你确定要删除此作品吗")) {
                return;
            }
            post({
                url: 'work/delete',
                data: {
                    id: id
                }
            }, (d) => {
                alert(d.msg);
                v.qh2();
            })
        },
        share: () => {
            dialog(
                `
                通过分享作品到其他平台，他人通过链接注册账号，你和他都可获得20金币<br>
                还可以让你的作品有更多人看到<br>
                链接：<code>${location.href + '&out=any&i=' + v.detail.id}</code>
                推荐分享形式(不推荐在他人作品下发)<br>
                复制内容到相应位置即可
                <h2>若你要分享到A营：</h2>
                1.自己A营个人主页的简介
                <code>
                    [${v.workview.name}](${location.href + '&out=aying&i=' + v.detail.id})
                </code>
                2.A营同个作品的介绍
                <code>
                    [这个作品也发布到了40code](${location.href + '&out=aying&i=' + v.detail.id})
                </code><br>
                3.A营其他人主页评论(不建议)
                <code>
                    [对方称呼]，你好，请问你能看看[${v.workview.name}](${location.href + '&out=aying&i=' + v.detail.id})吗？非常感谢。
                </code><br>
                <h2>若你要分享到小码王、scratch中社、共创世界：</h2>
                1.自己这些平台主页下的进行留言<br>
                <code>
                    我在40code发了一个作品，链接：${location.href + '&out=any&i=' + v.detail.id}
                </code>
                2.这些平台同个作品的介绍
                <code>
                    这个作品也发布到了40code: ${location.href + '&out=any&i=' + v.detail.id})
                </code>
                3.这些平台其他人主页评论(不建议)
                <code>
                    [对方称呼]，你好，请问你能看看${v.workview.name}吗？非常感谢。链接： ${location.href + '&out=any&i=' + v.detail.id}
                </code><br>
                <h2>若你要分享到QQ、微信：</h2>
                <code>[对方称呼]，你好，请问你能看看我的scratch作品(${v.workview.name})吗？非常感谢。<br>链接： ${location.href + '&out=any&i=' + v.detail.id}<br>请复制链接到浏览器访问</code>
                `
            )
        },
        analysis:()=>{
            alert('请稍等');
            var hatlist=['control_start_as_clone','procedures_definition','event_whenflagclicked', 'event_whenkeypressed', 'event_whenstageclicked', 'event_whenthisspriteclicked', 'event_whenbackdropswitchesto','event_whengreaterthan', 'event_whenbroadcastreceived','makeymakey_whenMakeyKeyPressed','makeymakey_whenCodePressed'];
            var json=JSON.parse(top[0].vm.toJSON());
            if(!json.targets.length){
                alert('请等待作品加载完毕再进行分析')
                return;
            }
            var targets=json.targets;
            var l={},valid=0,segs=0,vsegs=0; //有效代码数，片段数，有效片段数
            for(let i=0;i<targets.length;i++){
                let b=targets[i].blocks;
                let o=Object.keys(b);
                for(let j=0;j<o.length;j++){
                    try{
                        function find(t,n=0){
                            if(t.next){
                                return find(b[t.next],n+1);
                            }else return n;
                        }
                        if (b[o[j]].topLevel){
                            segs++;
                            if(hatlist.indexOf(b[o[j]].opcode)!==-1){
                                let f=find(b[o[j]]);
                                if(f){
                                    vsegs++;
                                    valid+=f+1;
                                }
                            }
                        }
                    }catch(e){
                        console.log(e)
                    };
                    try{
                        let n=b[o[j]].opcode.split('_')[0];
                        if(l[n]===undefined) l[n]=1;
                        else l[n]++;
                    }catch(e){
                        console.log(e)
                    }
                }
            }
            console.log(l)
            var jn=json.targets.length-1;
            var an=top[0].vm.assets.length;
            let s=({context:l,info:v.workview.name+'-'+v.workview.nickname,segs:segs,vsegs:vsegs,valid:valid,jn:jn,an:an});
            console.log(s);
            open("/other/analysis.html#"+encodeURI(JSON.stringify(s)));
            // alert('当前功能还在开发……')
        }
    },
    lb:[{
        href:"#page=post&id=5",
        src:'https://s1.ax1x.com/2022/05/01/OpXZoq.png'
    }],
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
            title: '我的工作室',
            c: function () {
                location.href = "#page=mystudio"
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
            title: '邀请用户领金币',
            c: function () {
               dialog(`
               你的专属链接<code>
               ${'https://40code.com/#out=any&i=' + v.detail.id}
               </code><br>
               别人通过你的专属链接进行账号注册<br>
               你和他都可获得20金币
               `)
            }
        },
        {
            title: '刷新',
            c: function () {
                if(location.href.indexOf('#')==-1)
                location.href = location.href+"#t="+(new Date())/1
                else
                location.href = location.href+"&t="+(new Date())/1
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
        if (!(!pattern.test(value) || value.length > 9)) return '纯数字密码必须大于9位'
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
                    t2: v.sign.token,
                    i: getCookie('i')
                },
                p: 'sign'
            },
                function (data) {
                    pagecz.sign()
                    if (data.code == 1) {
                        if (n == 0) {
                            location.href = getQueryString('url')?atob(getQueryString('url')):"#"
                            alert(data.msg)
                            setCookie('token', data.token, 30)
                            getuserinfo()
                        } else {
                            alert(data.msg)
                        }
                    } else {
                        alert(data.msg, 8000)
                    }
                })
        },
        data: {
            email: '',
            pw: ''
        },
        go:()=>{
            location.href="#page=sign&url="+btoa(location.href)
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
                    if (data.code == 1)
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
                if (data.code == 1)
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
        update: function () {
            if (v.waitRequest.cover==1) {
                alert("请选择图片并等待上传完毕后再继续操作")
                return;
            }
            setCookie('newpage',v.account.newpage,999);
            post({
                url: 'user/info/update',
                data: {
                    data:{
                        image:v.detail.image,
                        darkmode:v.detail.darkmode,
                        nickname:$('#i-input-0').val(),
                        introduce:$('#i-input-1').val()
                    },
                },
                p: 'changeinfo'
            }, function (d) {
                alert(d.msg)
                // location.href = ""
            })
        },
        edits:(type)=>{
            let data={};
            let t=['','nickname','introduce'],t2=['','nnedit','iedit'];
            data[t[type]]=$('#'+t2[type]).val();
            post({
                url: 'user/info/update',
                data: {
                    data:data,
                },
                p: 'changeinfo'
            }, function (d) {
                alert(d.msg)
                getuserinfo()
                location.href+='&time='+new Date/1
            })
        },
        newpage:getCookie('newpage')
    },
    comment: {
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
    },
    studio: {
        new: function () {
            if (!confirm("你确定要创建工作室吗？")) {
                return;
            }
            get({
                url: 'studio/new',
                p: 'newstudio'
            }, function (d) {
                if (d.code == -1) {
                    alert(d.msg);
                    return;
                }
                location.href = "/#page=studio&id=" + d.id;
            })
        },
        my: [],
        info: null,
        ilist: [],
        getwork: () => {
            get({
                url: "studio/work",
                data: {
                    id: v.studio.info.id,
                }
            }, (d) => {
                v.studio.worklist = d.data
            })
        },
        getuser: () => {
            get({
                url: "studio/user",
                data: {
                    id: v.studio.info.id,
                }
            }, (d) => {
                v.studio.userlist = d.data
                v.studio.p = d.p
            })
        },
        worklist: [],
        p: undefined,
        update: function () {
            let data = {};
            data.name = $("[t='s-name']").val();
            data.introduce = $("[t='s-introduce']").val();
            data.color = $("[t='s-color']").val();
            data.chose = v.studio.info.chose;
            // data.publish = $("[t='publish']")[0].checked;
            data.head = v.detail.image;
            data.id = v.studio.info.id;
            data.haspw = v.studio.info.haspw;
            data.pw = $("[t='s-pw']").val();
            console.log(data)
            post({
                url: 'studio/info/update',
                data: data,
                p: 'updatestudio'
            }, function (d) {
                console.log(d)
            })
        },
        quit: () => {
            if (!confirm('你确定要退出吗')) {
                return;
            }
            post({
                url: 'studio/quit',
                data: {
                    id: v.studio.info.id
                }
            }, function (d) {

            })
        },
        join: () => {
            let c = v.studio.info.chose;
            if (c == 2) {
                alert('此工作室禁止任何人加入')
            }
            post({
                url: 'studio/join',
                data: {
                    pw: v.studio.info.haspw && prompt('请输入工作室加入密码'),
                    id: v.studio.info.id
                }
            })

        },
        main: () => {
            post({
                url: 'studio/setmain',
                data: {
                    id: v.studio.info.id
                }
            })
        },
        upload:()=>{
            let url=prompt("请输入作品的链接或id"),id;
            if(isNaN(parseInt(url,10))){
                if(url.indexOf("#") < 0){
                    alert("请输入正确的链接")
                    return;
                }
                let z=/(\w+):\/\/([^/:]+)(:\d*)?([^# ]*)/;
                let reg=new RegExp("(^|&)" + "id" + "=([^&]*)(&|$)", "i")
                id=url.split("#")[1].match(reg)[2]
                if(!id){
                    alert("请输入正确的链接")
                    return;
                }
            }else{
                id=url;
            }
            
            post({
                url: 'studio/upload',
                data: {
                    id: v.studio.info.id,
                    work:id
                }
            })
        },
        chose: '0'
    },
    paste:(e)=>{
        console.log(e);
        let id=e.target.id;
        e=e.originalEvent;
	    var cbd = e.clipboardData;
        
	    var ua = window.navigator.userAgent;
	    // 如果是 Safari 直接 return
	    if ( !(e.clipboardData && e.clipboardData.items) ) {
	        return ;
	    }
	    // Mac平台下Chrome49版本以下 复制Finder中的文件的Bug Hack掉
	    if(cbd.items && cbd.items.length === 2 && cbd.items[0].kind === "string" && cbd.items[1].kind === "file" &&
	        cbd.types && cbd.types.length === 2 && cbd.types[0] === "text/plain" && cbd.types[1] === "Files" &&
	        ua.match(/Macintosh/i) && Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49){
	        return;
	    }
	    for(var i = 0; i < cbd.items.length; i++) {
	        var item = cbd.items[i];
	        if(item.kind == "file"){
	            var blob = item.getAsFile();
	            if (blob.size === 0) {
	                return;
	            }
                if(blob.size > 1024*80){
                    alert('图片大小不能大于80kb');
                    return;
                }
				var f = new FormData();
				function upa(data) {
                    // v.waitRequest.cover = 1;
                    alert('图片上传中',9000)
                    $.ajax({
                        url: 'https://www.hualigs.cn/api/upload?token=cae93a8b4292f11486c738c9c25e5d68&apiType=ai58',
                        method: 'POST',
                        data: data,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: 'json',
                        // 图片上传成功
                        success: function (res) {
                            try {
                                let k = ''+res.data.url.ai58;
                                alert("图片上传成功")
                                v.comment.text[id] += '![]('+k+')';
                            } catch (error) {    
                            }
                        },
                        error: function () {
                            alert("图片上传失败")
                        }
                    });
                }
                f.append("image", blob)
                upa(f)
	        }
	    }
    },
    search:{
        search:()=>{
            setTimeout(()=>{
                if(v.search.s2==-1) v.search.s2=0;
                location.href="#page=search&name="+($('#sname').val() || '')+"&author="+($('#sauthor').val() || '')+"&type="+v.search.type
                +'&p='+v.search.page+'&s='+v.search.s2;
            },1)
        },
        work:{},
        studio:[],
        user:[],
        page:1,
        num:0,
        time:0,
        s:[
            [
                '最早创建',
                '最早发布',
                '最近更新',
                '最近发布',
                '最多点赞',
                '最多浏览'
            ],
            [
                '最多金币',
                '最新注册',
                '最早注册',
            ],
            [
                '最多成员',
                '最多作品',
                '最早创建',
                '最新创建',
            ],
        ],
        isfirst:1,
        select:[
            '最新发布',
            '最多金币',
            '最多成员'
        ]
    },
    forum:{
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
        let d = ['index', 'sign', 'account', 'mywork', 'work', 'workinfo', 'user', 'message', 'search', 'flist', 'mystudio', 'studio', 'studio_edit','about','forum','post'], q = getQueryString('page');
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
    sb2: {
        show: false,
        text: ''
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
    title:'40code少儿编程社区',
    getQueryString:getQueryString,
    stitle:(s)=>{
        document.title=(s || v.title)+'  -40code';
        s && (v.title=s)
    }
}

var other = {
    date: (d) => {
        function p(num) {
            return (Array(2).join('0') + num).slice(-2);
        }
        if(!d){
            return '未统计'
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
            light: {
                primary: '#3f51b5',
                secondary: '#03A9F4',
                accent: '#EC407A',
                error: '#F44336',
            },
        }
    }),
    watch:{
        'search.page':()=>{
            v.search.search()
        },
        'search.type':()=>{
            
            if(v.search.isfirst){
                v.search.isfirst=0
            }else{
                v.search.page=1;
                v.search.author='';
                v.search.name='';
                v.search.search()
            }
        },
        'comment.page':()=>{
            v.comment.getcomment()
        },
        'user.msgpage':()=>{
            setTimeout(() => {
                v.user.getmessage()
            }, 1);
            
        },
        'search.select':()=>{
            v.search.s2=v.search.s[v.search.type].indexOf(v.search.select[v.search.type]);
        }
    }
})

v.qh2();
window.addEventListener('hashchange', function (event) {
    console.log(event);
    v.qh2();
})
var viewer;
$(document).ready(function () {
    getuserinfo()
    viewer=new Viewer(document.body, {
        filter: function(img) {
            let pm=$('.pm')
            for(let i=0;i<pm.length;i++){
                if(pm[i].contains(img)) return true;
            }
            return false;
        }
      })
    document.addEventListener('visibilitychange', function () {
        // 页面变为不可见时触发 
        if (document.visibilityState == 'hidden') {
            // document.title="我等你回来……"
        }
        // 页面变为可见时触发 
        if (document.visibilityState == 'visible') {
            v.stitle()
            getuserinfo();
        }
    }
    );
    setInterval(()=>{
        if (document.visibilityState == 'visible') {
            getuserinfo();
        }
    },40000)
});
