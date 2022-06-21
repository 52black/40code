module.exports=(id)=>{
    Vue.set(v.search,'type',getQueryString('type'))
    v.search.page= (+getQueryString('p') || 1)
    v.search.type= ((+getQueryString('type'))+1 ? +getQueryString('type') :0)
    Vue.set(v.search,'work',{})
    Vue.set(v.search,'studio',{})
    Vue.set(v.search,'user',{})
    Vue.set(v.search,'s2',getQueryString('s'))
    Vue.set(v.search,'name',getQueryString('name'))
    Vue.set(v.search,'author',getQueryString('author'))
    post({
        url:"/search/",
        data:{
            name:getQueryString('name'),
            author:getQueryString('author'),
            type:getQueryString('type'),
            s:getQueryString('s')||0,
            page:v.search.page
        }
    },function(d){
        let t=['work','user','studio']
        Vue.set(v.search,t[+getQueryString('type')],d.data)
        Vue.set(v.search,'num',d.data.num)
        Vue.set(v.search,'time',d.data.time)
        if(Math.ceil(v.search.num/12)<v.search.page && v.search.num!=0){
            v.search.page=Math.ceil(v.search.num/12);
        }
    })
}