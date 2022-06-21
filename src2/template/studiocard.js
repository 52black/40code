module.exports={
    props: ['studio', 'host'],
    template: `
    <v-card :href="'#page=studio&id='+studio.id" class="rounded-lg py-2 sd">

    <v-row class="pa-5">
        <v-col cols="4">
            <v-avatar size="50">
                <img
                    :src="host.data+'/static/internalapi/asset/'+(studio.head || '6e2b0b1056aaa08419fb69a3d7aa5727.png')" />
            </v-avatar>
        </v-col>
        <v-col cols="8">
            <span color="accent" class="
            text-h5 text--secondary text-truncate text-caption
            pr-3
            ">
                <div class="row">
                    <div class="col-12 text-truncate">
                        {{ studio.name }}
                    </div>
                </div>

                <span class="text--disabled">作品:</span>
                <a style="color:#555">{{ studio.worknum }}</a>
                <span class="text--disabled">成员:</span>
                <a style="color:#555">{{ studio.membernum }}</a>
            </span>

        </v-col>
    </v-row>
</v-card>
  
`
}