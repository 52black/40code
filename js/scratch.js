var workinfo, downloadurl;
$('#dlp').hide();
(async () => {
    if (getQueryString('token')) {
        setCookie('token', getQueryString('token'), 2)
    }
    let d;
    try {
        d = await getworkinfosync(getQueryString('id'));
        getuserinfo()
    } catch (error) {
        alert('作品信息获取失败')
    }
    // if(['test-c.sccode.tk'].indexOf(top.location.host)== -1){
    //     alert("暂不支持当前方式打开")
    //     return;
    // } 
    workinfo = d;
    window.scratchConfig.menuBar.customButtons[0].buttonName = workinfo.isauthor ? '保存' : '改编';
    if (workinfo.isauthor) {
        window.scratchConfig.menuBar.customButtons.push({
            buttonName: '设置当前截图为封面',
            style: {
                color: 'white',
                background: 'hsla(30, 100%, 55%, 1)',
            },
            handleClick: () => {
                savecover(function (id) {
                    post({
                        url: 'work/info/update',
                        data: { id: workinfo.id, image: id, coveronly: 1 },
                        p: 'updatework'
                    }, function (d) {
                        console.log(d)
                    })
                })

            }
        })
        window.scratchConfig.menuBar.customButtons.push({
            buttonName: '发布',
            style: {
                color: 'white',
                background: '#E91E63',
            },
            handleClick: async () => {
                save(1)

            }
        })
    }
    if (d === undefined) {
        alert("未知错误")
        $(document).text("未知错误")
        return
    }
    if (!d.issign) {
        alert("请登录后查看")
        $(document).text("请登录后查看")
        location.href = "/#page=sign"
        return
    }
    if (!(d.isauthor || (d.opensource && d.publish))) {
        alert("你没有权限，当前作品未开源或未发布")
        $(document).text("你没有权限，当前作品未开源或未发布")
        return
    }
    downloadurl = 'https://40code-cdn.zq990.com/work/' + d.id + '.json?' + atob(d.fuckyou);
    // downloadurl = '/work/' + d.id + '.json';
    // $('body').append('<script type="text/javascript" src="https://raw.fastgit.org/52black/123/master/scratch/lib35.min.js"></script> \
    // <script type="text/javascript" src="https://raw.fastgit.org/52black/123/master/scratch/gui9.js"></script>')
    $('body').append(`<script src="/other/scratch/i.php?type=lib.min.js"></script>
<script src="/other/scratch/i.php?type=gui.js"></script>`)
})()
var scratch2 = () => { }, temp2 = {};
function downloadFileByBlob(blob, fileName = "file") {
    let blobUrl = window.URL.createObjectURL(blob)
    let link = document.createElement('a')
    link.download = fileName || 'defaultName'
    link.style.display = 'none'
    link.href = blobUrl
    // 触发点击
    document.body.appendChild(link)
    link.click()
    // 移除
    document.body.removeChild(link)
}
function dlp() {
    window.scratch.getProjectFile(file => {
        downloadFileByBlob(file);
    })
}
function savecover(callback) {
    $('#b').hide();
    function uplw(d) {
        let f = new FormData();
        $("#loadinfo").html('正在保存封面文件');
        f.append("image", d)
        $.ajax({
            url: apihost + 'work/uploads',
            method: 'POST',
            data: f,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            // 图片上传成功
            success: function (result1) {
                if (result1.code != 1) {
                    hy();
                    alert("保存失败");
                    return;
                }
                hy(result1);
                alert('封面保存成功')
            },
            error: function () {
                hy();
                alert("保存失败");
            }
        });
    }
    function hy(r) {
        $("#scratch").css("opacity", "1");
        $('#view').hide();
        $('#dlp').hide();
        let k = r.data[2][0][1].Key.split('/');
        callback && callback(k[k.length - 1]);
    }
    $("#scratch").css("opacity", "0");
    $('#view').show();
    $('#dlp').show();
    $("#loadinfo").html('正在保存封面');
    window.scratch.getProjectCoverBlob(e => { uplw(e) })
}
async function saveproject(id, callback, Open) {
    console.log("自定义按钮1");
    console.log('分享按钮');
    let data2 = [];
    var vs = vm.assets;
    $("#scratch").css("opacity", "0");
    $('#view').show();
    $('#dlp').show();
    $('#i2').hide
    let f = function (i2) {
        let i = i2
        for (let j = 0; j < vs.length; j++) {
            if (vs[j].assetId == i.split('.')[0]) {
                i = j; break;
            }
        }
        debugger
        i = new Blob([vs[i].data], { type: vs[i].assetType.contentType })
        console.log(URL.createObjectURL(i))
        return i
    }

    function hy() {
        $("#scratch").css("opacity", "1");
        $('#view').hide();
        $('#dlp').hide();

        callback && callback();
    }
    function uplw() {
        let f = new FormData();
        $("#loadinfo").html('正在保存作品文件');
        f.append("work", new Blob([vm.toJSON()]))
        $.ajax({
            url: apihost + 'work/upload?token=' + getCookie('token') + '&id=' + (id || workinfo.id),
            method: 'POST',
            data: f,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            // 图片上传成功
            success: function (result1) {
                if (result1.code != 1) {
                    hy();
                    alert("保存失败");
                    return;
                }
                hy();
                $(window).unbind('beforeunload');
                window.onbeforeunload = null;
                Open && (location.href = ("/#page=workinfo&publish=1&id=" + workinfo.id))
                alert('作品保存成功')
            },
            error: function () {
                hy();
                alert("保存失败");
            }
        });
    }

    function upa(t) {
        // debugger;
        if (f(data2[t]).size > 5 * 1024 * 1024) {
            console.log('尺寸过大', t, data2[t], '跳过')
            t++;
            upa(t);
            return;
        }
        // debugger;
        let list = [], data = new FormData(), n = 0, file = f(data2[t]);
        data.append('image', file)
        console.log(n)
        debugger;
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
                if (result1.code != 1) {
                    hy();
                    alert("保存失败");
                    return;
                }
                // vm.assets[data2[t]].clean = true;
                $('#b').html(parseInt((t + 1/*n + t*/) / data2.length * 10000) / 100 + '%')
                if (t + 1/*n + t*/ >= data2.length) {
                    $('#b').hide();
                    uplw();
                }
                else
                    upa(t + 1)
            },
            error: function () {
                hy();
                alert("保存失败");
                console.log('保存失败');
            }
        });
    }

    function chunk(arr, size) {
        var objArr = new Array();
        var index = 0;
        var objArrLen = arr.length / size;
        for (var i = 0; i < objArrLen; i++) {
            var arrTemp = new Array();
            for (var j = 0; j < size; j++) {
                arrTemp[j] = arr[index++];
                if (index == arr.length) {
                    break;
                }
            }
            objArr[i] = arrTemp;
        }
        return objArr;
    }

    function aftercheck() {
        if (data2.length) {
            $("#loadinfo").html('正在保存素材');
            $('#b').show()
            upa(0);
        }
        else uplw();
    }

    $('#i2').hide()
    $("#loadinfo").html('正在检查素材列表');
    for (let i of vs) {
        data2.push(i.assetId + '.' + i.dataFormat)
    }
    let checkdata = await new Promise((resolve) => {
        console.log('fuckyou', data2)
        let list = chunk(data2, 20), filelist = [], num = 0;
        debugger;
        if (!list.length) resolve([])
        for (let i = 0; i < list.length; i++) {
            debugger;
            post({
                url: 'work/imagelist',
                data: { list: list[i] }
            }, (d) => {
                num++;
                console.log(d);
                filelist = filelist.concat(d.data);
                if (num == list.length) {
                    resolve(filelist);
                }
            }, (d) => {
                resolve(null)
            })
        }

    });
    if (checkdata) {
        data2 = checkdata
        console.log(data2)
        aftercheck();
    } else {
        alert('作品素材检查失败，请联系QQ:3274235903查看原因')
        hy();
    }


}
function save(open) {
    if (workinfo.isauthor)
        saveproject(null, null, open)
    else {
        $("#scratch").css("opacity", "0");
        $("#loadinfo").html('正在改编中');
        get({
            url: 'work/new',
            p: 'newwork'
        }, function (d) {
            saveproject(
                d.info.insertId,
                function () {
                    location.href = "/scratch#id=" + d.info.insertId;
                    location.reload();
                }, open
            )
        })
    }

}
function dataURLToBlob(dataurl) {
    var arr = dataurl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

window.scratchConfig = {
    logo: {
        show: true
        , url: "/img/logo.png" //logo地址，支持base64图片
        , handleClickLogo: () => {
            console.log('点击LOGO');
            window.open("/");
        }
    },
    menuBar: {
        //菜单栏样式
        style: {
            background: 'hsla(215, 100%, 65%, 1)',
        },
        //新建按钮
        newButton: {
            show: true,
            handleBefore() {
                return true
            }
        },
        //从计算机加载按钮
        loadFileButton: {
            show: true,
            handleBefore() {
                return true
            }
        },
        //保存到计算机按钮
        saveFileButton: {
            show: true,
            handleBefore() {
                return true
            }
        },
        //加速模式按钮
        turboModeButton: {
            show: true
        },
        //教程按钮
        helpButton: {
            show: true,
            handleBefore: () => {
                console.log("显示自己的教程")
                return true
            }
        },
        //我的物品按钮
        myStuff: {
            show: true,
            url: '/myProject'
        },
        //用户头像按钮
        userAvatar: {
            show: true,
            username: '用户名',
            avatar: './static/avatar.png',
            handleClick() {
                //弹出登录框等操作
                console.log("点击头像")
            }
        },
        customButtons: [
            {
                buttonName: '',
                style: {
                    color: 'white',
                    background: '#E91E63',
                },
                handleClick: () => {
                    save()
                }
                // 获取到项目名
            },
            {
                buttonName: '项目页',
                style: {
                    color: 'white',
                    background: '#E91E63',
                },
                handleClick: () => {
                    open("/#page=work&id=" + workinfo.id);
                }
                // 获取到项目名
            },

            //可继续新增按钮
        ]
    },
    blocks: {
        scale: 0.8, // 积木缩放比例
        // 隐藏分类
        // 分类代码:motion、looks、sound、events、control、sensing、operators、variables、myBlocks
        // 如需动态隐藏显示分类或积木，修改此配置后需手动执行 window.vm.emitWorkspaceUpdate()
        hideCatagorys: [],
        //隐藏积木
        /**积木代码：
          motion_movesteps  motion_turnright  motion_turnleft  motion_goto  motion_gotoxy  motion_glideto
          motion_glidesecstoxy  motion_pointindirection  motion_pointtowards  motion_changexby  motion_setx
          motion_changeyby  motion_sety  motion_ifonedgebounce  motion_setrotationstyle  motion_xposition  motion_yposition  motion_direction

          looks_sayforsecs  looks_say  looks_thinkforsecs  looks_think  looks_switchbackdropto  looks_switchbackdroptoandwait  looks_nextbackdrop
          looks_switchcostumeto  looks_nextcostume  looks_switchbackdropto  looks_nextbackdrop  looks_changesizeby  looks_setsizeto  looks_changeeffectby
          looks_seteffectto  looks_cleargraphiceffects  looks_show  looks_hide  looks_gotofrontback  looks_goforwardbackwardlayers  looks_backdropnumbername
          looks_costumenumbername  looks_backdropnumbername  looks_size

          sound_playuntildone  sound_play  sound_stopallsounds  sound_changeeffectby  sound_seteffectto  sound_cleareffects
          sound_changevolumeby  sound_setvolumeto  sound_volume

          event_whenflagclicked  event_whenkeypressed  event_whenstageclicked  event_whenthisspriteclicked  event_whenbackdropswitchesto
          event_whengreaterthan  event_whenbroadcastreceived  event_broadcast  event_broadcastandwait

          control_wait  control_repeat  control_forever  control_if  control_if_else  control_wait_until  control_repeat_until  control_stop
          control_create_clone_of  control_start_as_clone  control_create_clone_of  control_delete_this_clone  

          sensing_touchingobject  sensing_touchingcolor  sensing_coloristouchingcolor  sensing_distanceto  sensing_askandwait  sensing_answer
          sensing_keypressed  sensing_mousedown  sensing_mousex  sensing_mousey  sensing_setdragmode  sensing_loudness  sensing_timer  sensing_resettimer
          sensing_of  sensing_current  sensing_dayssince2000  sensing_username

          operator_add  operator_subtract  operator_multiply  operator_divide  operator_random  operator_gt  operator_lt  operator_equals  operator_and
          operator_or   operator_not  operator_join  operator_letter_of  operator_length  operator_contains  operator_mod  operator_round  operator_mathop
        */
        hideBlocks: [],
    },
    stageArea: { //舞台设置
        fullscreenButton: { //全屏按钮
            show: true,
            handleBeforeSetStageUnFull() { //退出全屏前的操作
                return true
            },
            handleBeforeSetStageFull() { //全屏前的操作
                return true
            }
        },
        startButton: { //开始按钮
            show: true,
            handleBeforeStart() { //开始前的操作
                return true
            }
        },
        stopButton: { // 停止按钮
            show: true,
            handleBeforeStop() { //停止前的操作
                return true
            }
        }
    },
    handleVmInitialized: (vm) => {
        window.vm = vm
        console.log("VM初始化完毕")
        $("#scratch").css("opacity", "0");
        $("#loadinfo").html('当前作品正在加载中');
    },
    handleProjectLoaded: () => {
        console.log("作品载入完毕")
        location.href = "#id=" + workinfo.id
    },
    handleDefaultProjectLoaded: () => {
        //默认作品加载完毕，可以在这里控制项目加载
        window.scratch.loadProject(downloadurl, (e) => {
            $("#scratch").css("opacity", "1");
            $('#view').hide();
            $('#dlp').hide();
            if (e === undefined) {
                console.log("项目加载完毕")
                for (let i in vm.assets) {
                    vm.assets[i].clean = true;
                }
            } else {
                alert("项目加载失败")
                console.log("项目加载失败")
                console.log(e);
            }
        })
    },
    //默认项目地址,不需要修请删除本配置项
    defaultProjectURL: '/other/static/project.sb3',//"https://cdn.jsdelivr.net/gh/52black/xiaoyu@master/public/unreleased/scratch/8050135381552279031529",
    //若使用官方素材库请删除本配置项, 默认为/static下的素材库
    assetCDN: scratchhost + '/static'
}
var cdn = 'https://cdn.jsdelivr.net/gh/52black/xiaoyu@master/public/' //'https://raw.githubusercontents.com/52black/xiaoyu/master/public/' //'https://cdn.jsdelivr.net/gh/52black/xiaoyu@master/public/';
