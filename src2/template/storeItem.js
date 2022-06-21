module.exports={
    props: ['info','host'],
    template: `
    <v-card outlined >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{info.name}}
        </v-list-item-title>
        <v-list-item-subtitle>{{info.descp}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
      ><v-img :src="host.data+'/static/internalapi/asset/'+(info.thumbId || '6e2b0b1056aaa08419fb69a3d7aa5727.png')" /></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
      >
        购买
      </v-btn>
      <v-spacer></v-spacer>{{price}}金币
    </v-card-actions>
    
    
  </v-card>
    `
}