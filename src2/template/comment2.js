module.exports={
    props: ['comment', 'reply'],
    template: `<span>
    <v-textarea clearable v-model="comment.text[reply?'c-'+reply:'comment']"
    clear-icon="mdi-close-circle" :id="reply?'c-'+reply:'comment'" filled label="评论" auto-grow :value="comment.text[reply?'c-'+reply:'comment']" maxlength="500" counter>
    </v-textarea>
    <v-btn class="pa-2 mx-auto sd" v-on:click="comment.send(reply)"  color="accent"  block>发送</v-btn>
</span>
`
}