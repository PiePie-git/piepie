<template>
  <div id="snake-game">
    <canvas ref="gameCanvas" width="300" height="300" style="border:1px solid #000;"></canvas>
  </div>
  <div style="text-align: center;">
    <span style="color: #000;">Score: {{ score }}</span>
  </div>
  <div style="text-align: center;">
    <button @click="start" v-if="gameOver">play</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      canvas: null,
      ctx: null,
      snake: [],
      food: {},
      squareSize: 20,
      gameWidth: 300,
      gameHeight: 300,
      dx: 20,
      dy: 0,
      changingDirection: false,
      score: 0,
      intervalId: null,
      xDown: null,
      yDown: null,
      gameOver: true
    };
  },
  methods: {
    start() {
      this.gameOver = false
      this.snake = []
      this.snake.push({x: 160, y: 160}, {x: 140, y: 160}, {x: 120, y: 160});
      this.createFood();
      this.main();
    },
    main() {
      this.didGameEnd()
      if (this.gameOver) return;

      this.changingDirection = false;
      setTimeout(this.main, 150);

      this.clearCanvas();
      this.drawFood();
      this.advanceSnake();
      this.drawSnake();
    },
    clearCanvas() {
      this.ctx.fillStyle = "white";
      this.ctx.strokeStyle = "black";
      this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      this.ctx.strokeRect(0, 0, this.gameWidth, this.gameHeight);
    },
    drawFood() {
      this.ctx.fillStyle = "red";
      this.ctx.strokestyle = "darkred";
      this.ctx.fillRect(this.food.x, this.food.y, this.squareSize, this.squareSize);
      this.ctx.strokeRect(this.food.x, this.food.y, this.squareSize, this.squareSize);
    },
    advanceSnake() {
      const head = {
        x: this.snake[0].x + this.dx,
        y: this.snake[0].y + this.dy
      };
      this.snake.unshift(head);

      const didEatFood = this.snake[0].x === this.food.x && this.snake[0].y === this.food.y;
      if (didEatFood) {
        this.score += 10;
        this.createFood();
      } else {
        this.snake.pop();
      }
    },
    didGameEnd() {
      for (let i = 4; i < this.snake.length; i++) {
        const didCollide = this.snake[i].x === this.snake[0].x && this.snake[i].y === this.snake[0].y
        this.gameOver = true;
      }

      const hitLeftWall = this.snake[0].x < 0;
      const hitRightWall = this.snake[0].x > this.gameWidth - this.squareSize;
      const hitToptWall = this.snake[0].y < 0;
      const hitBottomWall = this.snake[0].y > this.gameHeight - this.squareSize;

      this.gameOver = hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
    },
    randomTen(min, max) {
      return Math.round((Math.random() * (max-min) + min) / this.squareSize) * this.squareSize;
    },
    createFood() {
      this.food.x = this.randomTen(0, this.gameWidth - this.squareSize);
      this.food.y = this.randomTen(0, this.gameHeight - this.squareSize);
      this.snake.forEach(part => {
        const foodIsOnSnake = part.x === this.food.x && part.y === this.food.y;
        if (foodIsOnSnake) this.createFood();
      });
    },
    drawSnake() {
      this.snake.forEach(snakePart => {
        this.ctx.fillStyle = 'green';
        this.ctx.strokestyle = 'darkgreen';
        this.ctx.fillRect(snakePart.x, snakePart.y, this.squareSize, this.squareSize);
        this.ctx.strokeRect(snakePart.x, snakePart.y, this.squareSize, this.squareSize);
      });
    },
    changeDirection(event) {
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;

      if (this.changingDirection) return;
      this.changingDirection = true;
      const keyPressed = event.keyCode;
      const goingUp = this.dy === -this.squareSize;
      const goingDown = this.dy === this.squareSize;
      const goingRight = this.dx === this.squareSize;
      const goingLeft = this.dx === -this.squareSize;

      if (keyPressed === LEFT_KEY && !goingRight) {
        this.dx = -this.squareSize;
        this.dy = 0;
      }

      if (keyPressed === UP_KEY && !goingDown) {
        this.dx = 0;
        this.dy = -this.squareSize;
      }

      if (keyPressed === RIGHT_KEY && !goingLeft) {
        this.dx = this.squareSize;
        this.dy = 0;
      }

      if (keyPressed === DOWN_KEY && !goingUp) {
        this.dx = 0;
        this.dy = this.squareSize;
      }
    },
    changeDirectionTouchMove(event) {
      let direction = event.direction || null;

      if (this.changingDirection) return;
      this.changingDirection = true;

      const goingUp = this.dy === -this.squareSize;
      const goingDown = this.dy === this.squareSize;
      const goingRight = this.dx === this.squareSize;
      const goingLeft = this.dx === -this.squareSize;

      if (direction === 'LEFT' && !goingRight) {
        this.dx = -this.squareSize;
        this.dy = 0;
      }

      if (direction === 'UP' && !goingDown) {
        this.dx = 0;
        this.dy = -this.squareSize;
      }

      if (direction === 'RIGHT' && !goingLeft) {
        this.dx = this.squareSize;
        this.dy = 0;
      }

      if (direction === 'DOWN' && !goingUp) {
        this.dx = 0;
        this.dy = this.squareSize;
      }
    },
    handleTouchStart(evt) {
      const firstTouch = evt.touches[0];
      this.xDown = firstTouch.clientX;
      this.yDown = firstTouch.clientY;
    },
    handleTouchMove(evt) {
      if (!this.xDown || !this.yDown) {
        return;
      }

      let xUp = evt.touches[0].clientX;
      let yUp = evt.touches[0].clientY;

      let xDiff = this.xDown - xUp;
      let yDiff = this.yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          this.changeDirectionTouchMove({ direction: 'LEFT' });
        } else {
          this.changeDirectionTouchMove({ direction: 'RIGHT' });
        }
      } else {
        if (yDiff > 0) {
          this.changeDirectionTouchMove({ direction: 'UP' });
        } else {
          this.changeDirectionTouchMove({ direction: 'DOWN' });
        }
      }

      this.xDown = null;
      this.yDown = null;
    },
  },
  created() {
    window.addEventListener('keydown', this.changeDirection);
  },
  mounted() {
    this.canvas = this.$refs.gameCanvas;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.addEventListener('touchstart', this.handleTouchStart, false);
    this.canvas.addEventListener('touchmove', this.handleTouchMove, false);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.changeDirection);
    this.canvas.removeEventListener('touchstart', this.handleTouchStart);
    this.canvas.removeEventListener('touchmove', this.handleTouchMove);
    clearInterval(this.intervalId);
  }
};
</script>
<style>
#snake-game {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
</style>