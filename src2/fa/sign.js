module.exports={
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
}