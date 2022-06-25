module.exports={
    props: ['comment', 'host', 'detail', 'type', 'author'],
    template: `<div v-if="comment.comment" class="my-5">
<div v-for="i in comment.comment.comment" class="my-6">
    <div v-for="j in comment.comment.user[i.fromuser.toString()]" class="mt-2">
        <div>
            <v-row  no-gutters>
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
                                <v-btn  style="text-transform: none!important;"
                                    :color="comment.comment.studio[j.studio].color || 'green'" class="sd tg" small>
                                    <span style="color:white">{{ comment.comment.studio[j.studio].name }}</span>
                                </v-btn>
                            </a>
                        </v-col>
                        <v-col cols="12">
                            <span color="accent" class="pm" v-html="i.comment"></span>
                            <v-btn class="text--secondary float-left" text small v-on:click="comment.showreply(i.id)" style="margin-top: -15px;">
                                <v-icon>mdi-reply</v-icon> 回复
                            </v-btn>
                            <v-btn class="text--secondary float-right" text small style="margin-top: -15px;"
                                v-if="detail.id==i.touser || detail.id==i.fromuser"
                                v-on:click="comment.delete(i.id)">
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
            <div v-for="k in comment.comment.reply[i.id.toString()]">
                <div v-for="j in comment.comment.user[k.fromuser.toString()]" class="mt-2">

                    <v-row no-gutters>
                        <span style="flex: 0 0 50px;"></span>
                        <span style="flex: 0 0 10px;" class="mt-1">
                            <a :href="'#page=user&id='+i.fromuser">
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
                                        {{ j.nickname }} <span style="color:#888;font-size: 7px;">{{ k.time }}</span>
                                    </a>
                                    <a :href="\`#page=studio&id=\${comment.comment.studio[j.studio].id}\`"
                                        v-if="comment.comment.studio[j.studio]">
                                        <v-btn  style="text-transform: none!important;"
                                            :color="comment.comment.studio[j.studio].color || 'green'" class="sd tg" small>
                                            <span style="color:white">{{ comment.comment.studio[j.studio].name }}</span>
                                        </v-btn>
                                    </a>
                                </v-col>
                                <v-col cols="12">
                                    <span color="accent" class="pm" v-html="k.comment"></span>
                                    <v-btn class="text--secondary float-left" text small v-on:click="comment.showreply(i.id,k.id)" style="margin-top: -15px;">
                                        <v-icon>mdi-reply</v-icon> 回复
                                    </v-btn>
                                    <v-btn class="text--secondary float-right" text small
                                        v-if="detail.id==k.fromuser" style="margin-top: -15px;"
                                        v-on:click="comment.deletereply(k.id)">
                                        <v-icon>mdi-delete</v-icon> 删除
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </span>
                        
                        
                    </v-row>
                </div>
            </div>
        </div>
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