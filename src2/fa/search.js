module.exports={
    search:(f)=>{
        setTimeout(()=>{
            if(v.search.s2==-1) v.search.s2=0;
            location.href="#page=search&name="+($('#sname').val() || '')+"&author="+($('#sauthor').val() || getQueryString('author') || '')+"&type="+v.search.type
            +'&p='+v.search.page+'&s='+v.search.s2+'&sid='+(f?'':(getQueryString('sid') || ''))+'&fl='+(f?'':(getQueryString('fl') || ''))+'&fan='
            +(f?'':(getQueryString('fan') || ''))+'&follow='+(f?'':(getQueryString('follow') || ''));
        },1)
    },
    work:{},
    studio:[],
    user:[],
    page:1,
    num:0,
    time:0,
    sid:0,
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
}