<template>
    <div ref="sidebar" class="sidebar" :class="{ 'sidebar-open': sidebarActive, 'sidebar-close': !sidebarActive }">
        <div class="menu" :class="{ 'enable-bg': item.enable }" v-for="item in data" @click="toggleEnable(item)">
            <span :class="{ 'enable-color': item.enable }">{{ item.text }}</span>
            <sidebarChildren :data="item.children" v-if="item.children && item.enable"/>
        </div>

        <!-- extra demo 2-1 start -->
        <div class="select-area" v-if="path == '/advanced_demo'">
            <select class="custom-select" v-model="selected">
                <option :value="null">請選擇</option>
                <template v-for="item in data" :key="item.key">
                    <option :value="item.key">
                        {{ item.text }}
                    </option>
                    <template v-for="item2 in item.children" :key="item2.key" v-if="item.children">
                        <option :value="item2.key">
                            {{ item.text }}-{{ item2.text }}
                        </option>
                        <template v-for="item3 in item2.children" :key="item3.key" v-if="item2.children">
                            <option :value="item3.key">
                                {{ item.text }}-{{ item2.text }}-{{ item3.text }}
                            </option>
                        </template>
                    </template>
                </template>
            </select>
        </div>
        <!-- extra demo 2-1 end -->
    </div>
</template>
<script>
import sidebarChildren from './sidebarChildren.vue'
export default {
    components: {
        sidebarChildren
    },
    data() {
        return {
            data: [
                {
                    key: "64f",
                    text: "好喝黑糖",
                    children: [{
                        key: "445",
                        text: "黑糖鮮奶",
                        children: [{
                            key: "37a",
                            text: "黑糖珍珠鮮奶"
                        }, {
                            key: "feb",
                            text: "黑糖芋圓鮮奶"
                        }, {
                            key: "59c",
                            text: "黑糖蒟蒻鮮奶"
                        }]
                    }, {
                    key: "29e",
                    text: "黑糖冬瓜",
                    children: [{
                            key: "ac3",
                            text: "黑糖冬瓜牛奶"
                        }, {
                            key: "ca0",
                            text: "黑糖冬瓜珍珠"
                        }]
                    }]
                },
                {
                    key: "6c3",
                    text: "茶",
                    children: [{
                        key: "5dc",
                        text: "烏龍綠"
                        }, {
                        key: "b5f",
                        text: "綠茶"
                        }, {
                        key: "b09",
                        text: "紅茶"
                        }, {
                        key: "887",
                        text: "青茶"
                    }]
                }, {
                    key: "c81",
                    text: "咖啡",
                    children: [{
                            key: "e02",
                            text: "黑咖啡",
                            children: [{
                                key: "d20",
                                text: "濃縮咖啡"
                            }, {
                                key: "1f8",
                                text: "美式咖啡"
                            }]
                        }, {
                        key: "d7a",
                        text: "牛奶咖啡",
                        children: [{
                            key: "c09",
                            text: "拿鐵",
                            children: [{
                                key: "db2",
                                text: "黑糖拿鐵"
                                }, {
                                key: "9f6",
                                text: "榛果拿鐵"
                                }, {
                                key: "b61",
                                text: "香草拿鐵"
                            }]
                        }, {
                            key: "9ac",
                            text: "卡布奇諾"
                        }, {
                            key: "ce8",
                            text: "摩卡"
                        }]
                    }]
                }
            ],
            path: location.pathname,
            selected: null,
        }
    },
    mounted() {
        // extra demo 2-2
        if(localStorage.getItem('toggle') && this.path == '/advanced_demo') this.data = JSON.parse(localStorage.getItem('toggle'))
    },
    watch: {
        sidebarActive(v) {
            this.timeout = setTimeout(() => {
                v == true ? document.addEventListener('click', this.handleClickOutside) : document.removeEventListener('click', this.handleClickOutside);
            }, 100)
        },
        // extra demo 2-1
        selected(v) {
            if (v == null) return
            this.disableAllOption()

            const selectedItem = this.data.find(item => item.key === v);
            if (selectedItem) {
                selectedItem.enable = true;
            }

            this.data.forEach(item => {
                const selectedItem = item.children.find(item2 => item2.key === v);
                if (selectedItem) {
                    selectedItem.enable = true;
                    item.enable = true;
                }

                item.children.forEach(item2 => {
                    var selectedItem = false
                    if (item2.children) selectedItem = item2.children.find(item3 => item3.key === v);
                    if (selectedItem) {
                        selectedItem.enable = true;
                        item.enable = true;
                        item2.enable = true;
                    }
                })
            })

            // extra demo 2-2
            localStorage.setItem('toggle', JSON.stringify(this.data))
        }
    },
    computed: {
        sidebarActive() {
            return this.$store.state.sidebarActive
        }
    },
    methods: {
        // disable all option
        disableAllOption() {
            this.data.forEach(item => {
                item.enable = false;
                if (!item.children) return
                item.children.forEach(item2 => {
                    item2.enable = false;
                    if (!item2.children) return
                    item2.children.forEach(item3 => {
                        item3.enable = false;
                    });
                });
            });
        },
        // Open the enable toggle
        toggleEnable(selected) {
            this.data.forEach(e => {
                e.enable = false
            });
            selected.enable = !selected.enable;
            
            // extra demo 2-2
            if (this.path == '/advanced_demo') localStorage.setItem('toggle', JSON.stringify(this.data))
        },
        // Close sidebar if click outside
        handleClickOutside(event) {
            const sidebarElement = this.$refs.sidebar
            if (sidebarElement && !sidebarElement.contains(event.target)) {
                this.closeSidebar()
            }
        },
        // Close siderBar
        closeSidebar() {
            clearTimeout(this.timeout)
            this.$store.commit('SIDEBAR_ACTIVE', false)
        }
    }
}
</script>