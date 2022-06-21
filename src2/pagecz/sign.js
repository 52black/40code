module.exports=() => {
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
}