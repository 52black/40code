console.log(window,top,self);
var $=top.$,v=top.v;

function getQueryString(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  if (window.top.location.hash.indexOf("#") < 0) return null;
  let r = window.top.location.hash.split("#")[1].match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}
var id= getQueryString('id'),temp2={};
var apihost = "https://service-dq726wx5-1302921490.sh.apigw.tencentcs.com/",
mianhost="http://127.0.0.1:5500",
scratchhost="https://40code-cdn.zq990.com";

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

var downloadurl = 'https://40code-cdn.zq990.com/work/' + getQueryString('id') + '.json?' + atob(top.v.workview.fuckyou);
window.scratchConfig = {
  stageArea: {
    scale: window.innerWidth / 480,
    width: 480,
    height: 360,
    showControl: true, //是否显示舞台区控制按钮
    fullscreenButton: { //全屏按钮
      show: false,
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

  },
  handleProjectLoaded: () => {
    console.log("作品载入完毕")

  },
  handleDefaultProjectLoaded: () => {
    //默认作品加载完毕，一般在这里控制项目加载
    // window.scratch.setProjectName("默认项目")
    // window.scratch.loadProject(downloadurl, (e) => {
    //   console.log("项目加载完毕")
    //   window.scratch.setProjectName("默认项目")
    //   if (e === undefined) {
    //     console.log("项目加载完毕")

    //   } else {
    //     alert("项目加载失败")
    //     console.log("项目加载失败")
    //     console.log(e);
    //   }
    // })
  },
  assetCDN: scratchhost+'/static',
  //默认项目地址,不需要修请删除本配置项
   defaultProjectURL: downloadurl //"./static/project.sb3",
}
