module.exports={
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
}