module.exports={
    checkbox: [],
    new: function () {
        get({
            url: 'work/new',
            p: 'newwork'
        }, function (d) {
            location.href = "/editor.html#id=" + d.info.insertId;
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
}