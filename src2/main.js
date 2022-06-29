Vue.component('s-item', require('./template/item'))
Vue.component('s-comment', require('./template/comment'))
Vue.component('s-c2', require('./template/comment2'))
Vue.component('s-workcard', require('./template/workcard'))
Vue.component('s-usercard', require('./template/usercard'))
Vue.component('s-studiocard',require('./template/studiocard'))
Vue.component('s-store-item',require('./template/storeItem'))
Vue.component('s-bag-item',require('./template/bagitem'))
window.alert = (text, timeout) => {
    v.sb.text = text;
    v.sb.timeout = timeout || 3000;
    v.sb.show = 1;
};
window.dialog = (text) => {
    v.sb2.text = text;
    v.sb2.show = 1;
}
window.markdownToHtml=(text)=>{
    return DOMPurify.sanitize(marked.parse(text));
}
window.pagecz = {
    'index': require('./pagecz/index'),
    "search":require('./pagecz/search'),
    'sign': require('./pagecz/sign'),
    'mywork': require('./pagecz/mywork'),
    'mystudio': require('./pagecz/mystudio'),
    'work':  require('./pagecz/work'),
    'workinfo': require('./pagecz/workinfo'),
    'user': require('./pagecz/user'),
    'account': require('./pagecz/account'),
    'message': require('./pagecz/message'),
    'flist': require('./pagecz/flist'),
    'studio': require('./pagecz/studio'),
    'studio_edit': require('./pagecz/studio_edit'),
    'forum':()=>{
        v.forum.getlist()
    },
    'post':()=>{
        v.forum.post.get()
    },
    'myitem':()=>{
        v.item.get();
        getuserinfo();
    }
};

let functiona = {
    rules: require('./fa/rules'),
    item:require('./fa/item'),
    host: {
        data: 'https://40code-cdn.zq990.com',
        scratch: 'https://newsccode-1302921490.cos-website.ap-shanghai.myqcloud.com'
    },
    work: require('./fa/work'),
    lb:[{
        href:"#page=post&id=5",
        src:'https://s1.ax1x.com/2022/05/01/OpXZoq.png'
    }],
    items: require('./fa/items'),
    pw: value => {
        const pattern = /^[0-9]*$/
        if (!(!pattern.test(value) || value.length > 9)) return '纯数字密码必须大于9位'
        if (value.length < 6) return '密码必须大于6位'
    },
    sign: require('./fa/sign'),
    account: require('./fa/account'),
    comment: require('./fa/comment'),
    user: require('./fa/user'),
    studio: require('./fa/studio'),
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
                        url: 'https://www.hualigs.cn/api/upload?token=cae93a8b4292f11486c738c9c25e5d68&apiType=huluxia',
                        method: 'POST',
                        data: data,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: 'json',
                        // 图片上传成功
                        success: function (res) {
                            try {
                                let k = ''+res.data.url.huluxia;
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
    search:require('./fa/search'),
    forum:require('./fa/forum')
}
let functiono = {
    open:(url)=>window.open(url),
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
        let d = ['index', 'sign', 'account', 'mywork', 'work', 'workinfo', 'user', 'message', 'search', 'flist', 'mystudio', 'studio', 'studio_edit','about','forum','post','myitem'], q = getQueryString('page');
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

other = {
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

window.v = new Vue({
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
                v.search.search(1)
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
// var viewer;
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
