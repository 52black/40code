module.exports={
    props: ['user', 'host'],
    template: `
    <v-card :href="'#page=user&id='+user.id" class="py-2 sd">
  <v-row class="pa-5">
    <v-col cols="4">
      <v-avatar size="40">
        <img :src="host.data+'/static/internalapi/asset/'+(user.head || '6e2b0b1056aaa08419fb69a3d7aa5727.png')" />
      </v-avatar>
    </v-col>
    <v-col cols="8">
      <span color="accent" class="
          text-h5 text--secondary text-truncate text-caption
          
          pr-3
          ">
        <div class="row">
          <div class="col-12 text-truncate">
            {{ user.nickname }}
          </div>
        </div>
        <span class="text-truncate"></span>
        <!--<a :href="\`#page=studio&id=\${studio.id}\`" v-if="studio">
          <v-chip class="ma-2" :color="studio.color || 'green'" text-color="white">
              {{ studio.name }}
          </v-chip>
          </a>-->


        <span class="text--disabled">金币:</span>
        <a style="color:#FFC107">{{ user.coins }}</a>
      </span>
    </v-col>
  </v-row>
</v-card>
  
`
}