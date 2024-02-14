<template>
    <div>
        <div class="table" :class="{ animate: isAnimated }">
            <div v-for="number in 48" :key="number" class="cell" :style="{ backgroundColor: getColor(number) }" @click="selectNumber(number)">
                {{ number }}
            </div>
        </div>

        <div class="tip">
            <span v-if="!currentColor">請選擇一個顏色</span>
            <div class="colors" v-else>
                <span>已選擇</span>
                <button :style="{ backgroundColor: currentColor }"></button>
            </div>
        </div>

        <div class="tip">剩餘分數: {{ score }}</div>

        <div class="colors">
            <button v-for="(color, index) in colors" :key="color" :style="{ backgroundColor: color }" @click="setCurrentColor(color, colorValues[index])">{{ colorValues[index] }}</button>
        </div>

        <div class="tip">
            <button @click="drawNumber">抽取數字</button><br>
            <span v-if="drawnNumber">抽出的數字是: {{ drawnNumber }} {{ isWinner ? `中獎！獲得分數: ${winnerScore}` : '未中獎。' }}</span>
        </div>

        <button @click="toggleAnimation">切換視角</button>
    </div>
</template>
  
<script>
import { ref } from 'vue';
  
export default {
    setup() {
        const score = ref(1000); // 初始分數
        const colors = ['red', 'green', 'blue', 'yellow']; // 四種顏色
        const colorValues = [1, 5, 10, 20]; // 顏色對應的分數
        const selectedColors = ref({}); // 選中的格子及其顏色
        const currentColor = ref(null); // 當前選擇的顏色
        const currentColorValue = ref(0); // 當前選擇的顏色對應的分數
        const drawnNumber = ref(null); // 抽出的數字
        const isWinner = ref(false); // 是否中獎
        const winnerScore = ref(0); // 獲得的分數
        const isAnimated = ref(false); // 是否旋轉表格

        // 從1~48中選取數字，把顏色填進去並扣除對應顏色的分數
        const selectNumber = (number) => {
            if (currentColor.value && score.value >= currentColorValue.value) {
                selectedColors.value[number] = currentColor.value;
                score.value -= currentColorValue.value;
            }
        };

        // 從1~48預設為白色
        const getColor = (number) => {
            return selectedColors.value[number] || 'white';
        };

        // 設定目前選擇的顏色
        const setCurrentColor = (color, value) => {
            currentColor.value = color;
            currentColorValue.value = value;
        };

        // 抽取數字
        const drawNumber = () => {
            const randomNumber = Math.floor(Math.random() * 48) + 1;
            drawnNumber.value = randomNumber;
            isWinner.value = selectedColors.value[randomNumber] !== undefined;
            winnerScore.value = isWinner.value ? colorValues[colors.indexOf(selectedColors.value[randomNumber])] * 20 : 0;
            score.value += winnerScore.value;
        };

        // 旋轉表格
        const toggleAnimation = () => {
            isAnimated.value = !isAnimated.value;
        };

        return { score, colors, colorValues, selectedColors, currentColor, currentColorValue, drawnNumber, isWinner, winnerScore, isAnimated, selectNumber, getColor, setCurrentColor, drawNumber, toggleAnimation };
    }
};
</script>

<style>
.table {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 2px;
    transition: transform 1s;
    transform-style: preserve-3d;
}

.table.animate {
    transform: rotateX(45deg) rotateY(0deg) translateZ(-100px);
}

.cell {
    width: 30px;
    height: 30px;
    border: 1px solid black;
    text-align: center;
    line-height: 30px;
    color: black;
    cursor: pointer;
}

.tip {
    color: black;
    text-align: center;
    margin-top: 1rem;
}

.colors {
    display: flex;
    justify-content: center;
    align-items: center;
}
  
.colors button {
    width: 30px;
    height: 30px;
    margin: 5px;
    border: none;
    cursor: pointer;
}
</style>