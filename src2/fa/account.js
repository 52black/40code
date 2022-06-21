module.exports={
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
}