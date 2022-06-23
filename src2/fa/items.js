module.exports=[

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
           你和他都可获得100金币
           `)
        }
    },
    {
        title: '刷新',
        c: function () {
            // if(location.href.indexOf('#')==-1)
            // location.href = location.href+"#t="+(new Date())/1
            // else
            // location.href = location.href+"&t="+(new Date())/1
            v.qh2()
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

]