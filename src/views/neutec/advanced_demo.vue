<template>
    <div class="view-area" :style="{ 'height': windowHeight + 'px'}">

        <!-- a button to replay -->
        <button style="position: absolute; top: 5%; left: 15%;" @click="reload">click to replay the animation</button>

        <!-- extra demo 1-1 start -->
        <transition name="extra" appear>
            <div class="extra-ball">0</div>
        </transition>
        <!-- extra demo 1-1 end -->

        <!-- extra demo 1-2 start -->
        <transition-group name="extra2" appear>
            <div class="extra-ball2" :class="{ 'left-1': item == 1, 'left-2': item == 2, 'left-3': item == 3, 'left-4': item == 4 }" v-for="item in balls" :key="item">{{ item }}</div>
        </transition-group>
        <!-- extra demo 1-2 end -->

        <div class="content">
            <div class="square"><div class="ball">0</div></div>
            <div class="square"></div>
            <div class="square"><div class="ball">0</div></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"><div class="ball">0</div></div>
            <div class="square"></div>
            <div class="square"><div class="ball">0</div></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            balls:[1, 2, 3, 4]
        }
    },
    computed: {
        windowHeight() {
            return window.innerHeight - 30
        }
    },
    methods: {
        reload() {
            location.reload()
        }
    }
}
</script>