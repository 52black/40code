module.exports={
    props: ['info','host'],
    template: `<v-card
      class="mx-auto pa-2"
      rounder
    >

         <v-img :src="host.data+'/static/internalapi/asset/'+(info.item.thumbId || '6e2b0b1056aaa08419fb69a3d7aa5727.png')" style="width:100%"
  max-height="60"
  max-width="60"></v-img>
      <span style="position: absolute;color: #222;background-color: #fff;border-radius: 0 0 10px;-webkit-box-shadow: 0 2px 10px #e8e8e8;box-shadow: 0 2px 10px #e8e8e8;text-align: center;left: 0;top: 0;width: 24px;height: 24px;line-height: 24px;">info.count</span>
    </v-card>`}