module.exports=[
    value => {
        let f = new FormData();
        console.log(value)
        if (value.size > 500000) return '图片必须小于500KB';
        if (['image/jpeg', 'image/png', 'image/gif', 'image/bmp'].indexOf(value.type) == -1) return '不支持此格式的图片'
        function upa(data) {
            v.waitRequest.cover = 1;
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
                    let k = result1.data[2][0][1].Key.split('/');
                    v.detail.image = v.workview.image = k[k.length - 1];
                    value = undefined;
                    // delete waitRequest.cover;
                    v.waitRequest.cover = -1;
                    // console.log(k,v.workview.imgpre)
                },
                error: function () {
                    alert("图片上传失败")
                    v.waitRequest.cover = -1;
                    delete v.waitRequest.cover;
                }
            });
        }
        f.append("image", new Blob([value], { type: value.type }))
        upa(f)
        // return false;
    }
    // value => !value || value.size < 2000000 || '图片必须小于2MB',
]