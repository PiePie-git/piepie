<template>
    <div class="child" v-for="item in data" @click="toggleEnable(item)">
        <span :class="{ 'enable-color': item.enable }">{{ item.text }}</span>
        <sidebarChildren :data="item.children" v-if="item.children && item.enable"/>
    </div>
</template>
<script>
import sidebarChildren from './sidebarChildren.vue'
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        // Open the enable toggle
        toggleEnable(item) {
            this.data.forEach(e => {
                e.enable = false
            });
            item.enable = !item.enable;
        },
    }
}
</script>