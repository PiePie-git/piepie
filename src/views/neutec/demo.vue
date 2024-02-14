<template>
    <div class="view-area" :style="{ 'height': windowHeight + 'px'}">
        <div class="content">
            <div class="square"><div class="ball">0</div></div>
            <div class="square"></div>
            <div class="square-flash"><div class="ball">0</div></div>
            <div class="square"></div>
            <div class="square-flash"></div>
            <div class="square"></div>
            <div class="square"><div class="ball">0</div></div>
            <div class="square"></div>
            <div class="square-flash"><div class="ball">0</div></div>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        windowHeight() {
            return window.innerHeight - 30
        }
    }
}
</script>