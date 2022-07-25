module.exports = {
  checkbox: [],
  new: function () {
    post(
      {
        url: "work/new",
        p: "newwork",
      },
      function (d) {
        location.href = "/editor.html#id=" + d.info.insertId;
      }
    );
  },
  update: function () {
    let d = $("[name='editinfo']"),
      data = {};
    data.name = $("[t='name']").val();
    data.introduce = $("[t='introduce']").val();
    data.opensource = $("[t='opensource']")[0].checked;
    data.publish = $("[t='publish']")[0].checked;
    data.image = v.workview.image;
    data.id = v.$data.workview.id;
    console.log(data);
    post(
      {
        url: "work/info/update",
        data: data,
        p: "updatework",
      },
      function (d) {
        console.log(d);
        location.href = "#page=work&id=" + v.$data.workview.id;
        // v.$data.qh('work', v.$data.workview.id)
      }
    );
  },
  return: function () {
    location.href = "#page=work&id=" + v.$data.workview.id;
    // v.$data.qh('work', v.$data.workview.id)
  },
  all: function (a) {
    if (a) {
      location.href = "#page=allwork" + a;
    }
    setTimeout(() => {
      get(
        {
          url: "work/all",
          data: {
            tags: getQueryString("tags"),
            user: getQueryString("user"),
            name: getQueryString("name"),
          },
        },
        function (d) {
          v.$data.rows = [
            {
              title: "作品",
              worklist: d.data.worklist,
              userlist: d.data.userlist,
            },
          ];
        }
      ),
        100;
    });
  },
  search: function () {
    location.href =
      "#page=allwork&name=" +
      $("#sname").val() +
      "&user=" +
      $("#sauthor").val();
    // v.work.all()
  },
  like: () => {
    post(
      {
        url: "work/like" + (v.workview.islike ? "/cancel" : ""),
        data: {
          id: v.workview.id,
        },
      },
      (d) => {
        alert(d.msg);
        v.workview.islike ? v.workview.like-- : v.workview.like++;
        v.workview.islike = !v.workview.islike;
      }
    );
  },
  del: (id) => {
    if (!confirm("你确定要删除此作品吗")) {
      return;
    }
    post(
      {
        url: "work/delete",
        data: {
          id: id,
        },
      },
      (d) => {
        alert(d.msg);
        v.qh2();
      }
    );
  },
  share: () => {
    get(
      {
        url: "work/link",
        data: {
          id: getQueryString("id"),
        },
      },
      function (d) {
        if (d.data.indexOf("etime"))
          dialog(
            d.data + "<br>" + "链接有效期7天，获取到此链接的人可查看此作品"
          );
        else
          dialog(
            d.data +
              "<br>" +
              "分享此作品给未注册40code的人，通过此链接注册，你可获得100金币"
          );
      }
    );
  },
  analysis: () => {
    alert("请稍等");
    var vm = top.vm || top[0].vm || top[1].vm || top[2].vm;
    var targets = vm.runtime.targets.map((i) => i.sprite.blocks._blocks);
    if (!targets.length) {
      alert("请等待作品加载完毕再进行分析");
      return;
    }

    var hatlist = [
      "control_start_as_clone",
      "procedures_definition",
      "procedures_prototype",
      "event_whenflagclicked",
      "event_whenkeypressed",
      "event_whenstageclicked",
      "event_whenthisspriteclicked",
      "event_whenbackdropswitchesto",
      "event_whengreaterthan",
      "event_whenbroadcastreceived",
      "makeymakey_whenMakeyKeyPressed",
      "makeymakey_whenCodePressed",
    ];
    var looplist = [
      "control_repeat",
      "math_whole_number",
      "control_forever",
      "control_if",
      "control_if_else",
      "control_repeat_until",
      "control_while",
      "control_for_each",
      "math_whole_number",
    ];
    var l = {},
      valid = 0,
      segs = 0,
      vsegs = 0;
       //对应分类列表，有效代码数，片段数，有效片段数
    for (let i = 0; i < targets.length; i++) {
      let validBlock = [];
      let b = targets[i];
      let o = Object.keys(b);
      for (let j = 0; j < o.length; j++) {
        if (b[o[j]].shadow) continue;
        try {
          function find(t, n = 0) {
            validBlock.push(t.id);
            if (t.next) {
              return find(b[t.next], n + 1);
            } else return n;
          }
          if (b[o[j]].topLevel) {
            segs++;
            if (hatlist.indexOf(b[o[j]].opcode) !== -1) {
              let f = find(b[o[j]]);
              if (f) {
                vsegs++;
                valid += f + 1;
              }
            }
          }
          if (looplist.indexOf(b[b[o[j]].parent].opcode) !== -1) {
            let f = find(b[o[j]]);
            valid++;
            if (f) {
              valid += f;
            }
          }
        } catch (e) {
          console.log(e);
        }
        try {
          let n = b[o[j]].opcode.split("_")[0];
          if (l[n] === undefined) l[n] = 1;
          else l[n]++;
        } catch (e) {
          console.log(e);
        }
      }
      console.log(validBlock)
      for (let j = 0; j < o.length; j++) {
        if (b[o[j]].shadow) continue;
        try {
          function find2(t) {
            if (validBlock.indexOf(t.id) !== -1) return 1;
            if (t.parent) {
              return find2(b[t.parent]);
            } else return 0;
          }
          if (b[o[j]].parent && validBlock.indexOf(b[o[j]].id) === -1) {
            let f = find2(b[b[o[j]].parent]);
            if (f) {
              valid++;
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
    console.log(l, valid);
    var jn = targets.length - 1;
    var an = top[0].vm.assets.length;
    let s = {
      context: l,
      info: v.workview.name + "-" + v.workview.nickname,
      segs: segs,
      vsegs: vsegs,
      valid: valid,
      jn: jn,
      an: an,
      // noreturn,
    };
    console.log(s);
    dialog(
      '<iframe src="' +
        "/other/analysis.html#" +
        encodeURI(JSON.stringify(s)) +
        '" style="width:100%;border-width: 0px;height:700px"></iframe>',
      750
    );
  },
};
