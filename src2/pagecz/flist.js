module.exports=(id) => {
    if(getQueryString('f')) v.stitle("关注列表")
    else v.stitle('粉丝列表')
    v.user.getlist(id)
}