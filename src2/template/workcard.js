module.exports={
    props: ['work', 'user', 'host', 'my'],
    template: `
    <v-card class=" mb-3 sd">
    <v-card :href="'#page=work&id='+work.id" elevation="0">
        <v-img :src="host.data+'/static/internalapi/asset/'+work.image" :aspect-ratio="4/3"
            class="white--text align-end" gradient="to bottom, rgba(0,0,0,0) 80%, rgba(0,0,0,.6)">
            <span class="ma-2">
                <span>
                    <v-icon color="white" size="16">mdi-eye</v-icon> {{ work.look }}
                </span>
                <span class="ml-1">
                    <v-icon color="white" size="16">mdi-heart</v-icon> {{ work.like }}
                </span>
            </span>
        </v-img>
        <div class="text-truncate px-5 mt-3 mb-1 text-heading-6">
         <span v-if="work.featuredLevel==1" class="pr-1" style="color:#888">初精</span>
      {{ work.name }}
      </div>
        <span class="px-5 text-truncate text-caption row" v-if="user">
            <span class="col-12 text-truncate">
                <v-avatar size="25">
                    <img
                    :lazy-src="host.data+'/static/internalapi/asset/'+(user.head || '26d7d5882a55edf148d97f50facc828a.svg')"
                        :src="host.data+'/static/internalapi/asset/'+(user.head || '26d7d5882a55edf148d97f50facc828a.svg')">
                </v-avatar>
                <span class="text-subtitle-1 text--secondary "
                    :href="'#page=user&id='+work.author">{{
                    user.nickname }}</span><br>
                </a>
                <span else><br></span>
            </span>
    </v-card>
    <span v-if="my">
        <v-btn color="green" text v-if="work.publish" depressed block text tile>已发布
        </v-btn>
        <v-btn color="red" text v-else depressed block text tile>未发布
        </v-btn>
        <span>
            <v-btn color="accent" class="" v-if="my" :href="'/editor.html#id='+work.id" target="_blank"
                depressed text block>继续创作
            </v-btn>
            <v-btn color="accent" class="" v-if="my" v-on:click="my.del(work.id)" target="_blank"
                depressed text block>删除
            </v-btn>
        </span>
        <br>
    </span>
</v-card>
    `
}