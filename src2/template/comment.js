module.exports={
    props: ['comment', 'host', 'detail', 'type', 'author','date'],
    template: `<div v-if="comment.comment" class="my-5 comment-view">
    <div v-for="(i, index) in comment.comment.comment" class="my-6">
        <div v-for="j in comment.comment.user[i.fromuser.toString()]" class="mt-2">
            <div>
                <v-row no-gutters>
                    <span style="flex: 0 0 5px;"></span>
                    <span style="flex: 0 0 10px;" class="mt-1">
                        <a :href="'#page=user&id='+i.fromuser">
                            <v-avatar size=40 class="">
                                <img
                                    :src="host.data+'/static/internalapi/asset/'+(j.head || '6e2b0b1056aaa08419fb69a3d7aa5727.png')">
                            </v-avatar>
                        </a>
                    </span>
                    <span style="flex: 0 0 10px;"></span>
                    <span style="flex: 0 0 calc( 100% - 60px)">
                        <v-row no-gutters>
                            <v-col cols="12">
                                <a :href="'#page=user&id='+i.fromuser">
                                    {{ j.nickname }} <span style="color:#888;font-size: 7px;">{{ i.time }}</span>
                                </a>
                                <a :href="\`#page=studio&id=\${comment.comment.studio[j.studio].id}\`"
                                    v-if="comment.comment.studio[j.studio]">
                                    <v-btn style="text-transform: none!important;"
                                        :color="comment.comment.studio[j.studio].color || 'green'" class="sd tg" small>
                                        <span style="color:white">{{ comment.comment.studio[j.studio].name }}</span>
                                    </v-btn>
                                </a>
                            </v-col>
                            <v-col cols="12">
                                <span color="accent" class="pm" v-html="i.comment"></span>
                                <v-btn class="text--secondary float-left" text small
                                    v-on:click="comment.showreply(i.id)" style="margin-top: -15px;">
                                    <v-icon>mdi-reply</v-icon> 回复
                                </v-btn>
                                <v-btn class="text--secondary float-right" text small style="margin-top: -15px;"
                                    v-if="detail.id==i.touser || detail.id==i.fromuser || detail.is_admin"
                                    v-on:click="comment.delete(i.id,detail.id==i.touser || detail.id==i.fromuser)">
                                    <v-icon>mdi-delete</v-icon> 删除
                                </v-btn>
                                <br>
                                <span v-if="comment.replyid==i.id">
                                    <br>
                                    <s-c2 :comment="comment" :host="host" :detail="detail" :reply="i.id" class="mt">
                                    </s-c2>
                                </span>


                            </v-col>
                        </v-row>
                    </span>

                </v-row>
            </div>
            <div v-if="i.replynum">
                <div v-for="(k,num) in comment.comment.reply[i.id.toString()]">
                    <div v-for="j in comment.comment.user[k.fromuser.toString()]" class="mt-2" v-if="num<2 || i.show">

                        <v-row no-gutters>
                            <span style="flex: 0 0 50px;"></span>
                            <span style="flex: 0 0 10px;" class="mt-1">
                                <a :href="'#page=user&id='+j.id">
                                    <v-avatar size=40 class="">
                                        <img
                                            :src="host.data+'/static/internalapi/asset/'+(j.head || '6e2b0b1056aaa08419fb69a3d7aa5727.png')">
                                    </v-avatar>
                                </a>
                            </span>
                            <span style="flex: 0 0 15px;"></span>
                            <span style="flex:0 0 calc( 100% - 110px )">
                                <v-row no-gutters>
                                    <v-col cols="12">
                                        <a :href="'#page=user&id='+k.fromuser">
                                            {{ j.nickname }} <span
                                                style="color:#888;font-size: 7px;">{{ k.time }}</span>
                                        </a>
                                        <a :href="\`#page=studio&id=\${comment.comment.studio[j.studio].id}\`"
                                            v-if="comment.comment.studio[j.studio]">
                                            <v-btn style="text-transform: none!important;"
                                                :color="comment.comment.studio[j.studio].color || 'green'" class="sd tg"
                                                small>
                                                <span
                                                    style="color:white">{{ comment.comment.studio[j.studio].name }}</span>
                                            </v-btn>
                                        </a>
                                    </v-col>
                                    <v-col cols="12">
                                        <span color="accent" class="pm" v-html="k.comment"></span>
                                        <v-btn class="text--secondary float-left" text small
                                            v-on:click="comment.showreply(i.id,k.id)" style="margin-top: -15px;">
                                            <v-icon>mdi-reply</v-icon> 回复
                                        </v-btn>
                                        <v-btn class="text--secondary float-right" text small
                                            v-if="detail.id==k.fromuser || detail.is_admin" style="margin-top: -15px;"
                                            v-on:click="comment.deletereply(k.id,detail.id==k.fromuser)">
                                            <v-icon>mdi-delete</v-icon> 删除
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </span>


                        </v-row>
                    </div>
                </div>
                <div class="text-center">
                    <v-btn class="text--secondary px-auto" v-if="i.replynum>2 && !i.show" text small v-on:click="comment.showmore(index)" style="">
                        显示更多
                    </v-btn>
                </div>
            </div>
        </div>
        <div v-if="index%4==0" class="mt-2">
            <v-row no-gutters>
                <span style="flex: 0 0 5px;"></span>
                <span style="flex: 0 0 10px;" class="mt-3">
                    <a :href="'#page=user&id='+comment.comment.ad[index/4].author">
                        <v-avatar size=40 class="">
                            <img
                                :src="host.data+'/static/internalapi/asset/'+(comment.comment.admap[comment.comment.ad[index/4%4].author].head || '6e2b0b1056aaa08419fb69a3d7aa5727.png')">
                        </v-avatar>
                    </a>
                </span>
                <span style="flex: 0 0 10px;"></span>
                <span style="flex: 0 0 calc( 100% -60px ) ;">
                    <v-row no-gutters>
                        <v-col cols="12">
                        <a :href="'#page=work&id='+comment.comment.ad[index/4%4].id">
                        {{comment.comment.ad[index/4%4].name}}
                        </a>
                            <span style="color:#999">(作品推荐卡)</span>
                            <span class="ml-2"
                                style="color:#777">{{ date(comment.comment.ad[index/4%4].update_time) }}</span>
                        </v-col>
                        <span style="flex: 0 0 200px;">
                            <a :href="'#page=work&id='+comment.comment.ad[index/4%4].id">
                                <img style="max-width:200px"
                                    :src="host.data+'/static/internalapi/asset/'+(comment.comment.ad[index/4%4].image || '6e2b0b1056aaa08419fb69a3d7aa5727.png')" />
                            </a>
                        </span>
                        <span style="flex: 0 0 10px;"></span>
                        <span style="flex: 0 0 200px;">
                            <span style="color:#999">
                                <v-icon size="16">mdi-eye</v-icon> {{ comment.comment.ad[index/4%4].look }}
                            </span>
                            <span style="color:#999" class="ml-1">
                                <v-icon size="16">mdi-heart</v-icon> {{ comment.comment.ad[index/4%4].like }}
                            </span><br>
                            <span style="color:#999">作者：</span><a :href="'#page=user&id='+comment.comment.ad[index/4%4].author">
                            {{comment.comment.admap[comment.comment.ad[index/4%4].author].nickname}}
                            </a>
                        </span>
                    </v-row>
        </div>
    </div>
    <div class="text-center my-3" v-if="comment.comment.num>0">
        <v-pagination v-model="comment.page" :length="Math.ceil(comment.comment.num/6)" :total-visible="7">
        </v-pagination>
    </div>
</div>
<div v-else>
    此用户暂时没有评论哦
</div>`}