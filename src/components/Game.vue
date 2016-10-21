<template>
<div class="hello">
<!--   <div>
    <input type="button" value="left" @click="moveLeft">
    <input type="button" value="right" @click="moveRight">
    <input type="button" value="top" @click="moveTop">
    <input type="button" value="bottom" @click="moveBottom">
  </div>
 -->
  <div class="back">
    <div class="backceil" v-for="n in 16">

    </div>
  </div>
  <div class="game">
    <div v-for="row in map" class="line">
      <div
        v-for="item in row"
        class="ceil"
        v-bind:class="{ 'trans': isA, 'visib': item[0], 'color': item[0]>8, 'font': item[0].toString().length>3 }"
        v-bind:style="{background: fn[item[0]], transform: `translate3d(${item[1]*wid}px, ${item[2]*wid}px, 0)`}"
      >{{ item[0]!=unit[0] ? item[0] : '' }}</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    let unit = [0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192]
    let color = ['#CCC0B3', '#EEE3DA', '#EDE0C8', '#F2B179', '#F59563', '#f67c5f', '#f65e3b', '#edcf72', '#edcc61', '#9c0', '#33b5e5', '#09c', '#a6c', '#93c']

    let fn = {}
    for (let i = 0; i < unit.length; i++) {
      fn[unit[i]] = color[i]
    }

    return {
      wid: 110 + 16,
      unit: unit,
      anim: 300,
      ok: true,   // false => in 400ms
      isA: true,  // transition whether
      map: [
          [[4,0,0], [0,0,0], [2,0,0], [0,0,0]],
          [[0,0,0], [0,0,0], [0,0,0], [2,0,0]],
          [[0,0,0], [4,0,0], [0,0,0], [0,0,0]],
          [[16,0,0], [8,0,0], [2,0,0], [0,0,0]]
      ],
      fn: fn
    }
  },
  created () {
    document.onkeydown = ()=>{
      let event = window.event||arguments[0]
      if(event.keyCode==37){
        this.moveLeft();
      }else if(event.keyCode==39){
        this.moveRight();
      }
      else if(event.keyCode==38){
        this.moveTop();
      }
      else if(event.keyCode==40){
        this.moveBottom();
      }
    }

    console.log('123')
  },
  methods: {
    randCeil () {
      let arr = [], gameOver = false
      for (let i = 0; i < this.map.length; i++) {
        for (let j = 0; j < this.map[i].length; j++) {
          if(this.map[i][j][0] == 0){
            arr.push([i, j])
          }
        }
      }
      if(arr.length == 1){
        gameOver = true
      }
      let x = Math.floor(Math.random() * arr.length)
      this.map[ arr[x][0] ][ arr[x][1] ][0] = Math.random()*10 < 1 ? 4 : 2
      this.map.splice(0, 0)

      gameOver && this.gameOver()
    },

    gameOver () {
      for (let i = 0; i < this.map.length; i++) {
        let last
        for (let j = 0; j < this.map[i].length; j++) {
          if( this.map[i][j][0] == last )
            return;
          last = this.map[i][j][0]
        }
      }
      for (let j = 0; j < this.map[0].length; j++) {
        let last
        for (let i = 0; i < this.map.length; i++) {
          if( this.map[i][j][0] == last )
            return;
          last = this.map[i][j][0]
        }
      }
      console.log('game over!!')
    },
    // to left  to top
    repaintLt () {
      for (let i = 0; i < this.map.length; i++) {
        for (let j = 0; j < this.map[i].length; j++) {
          let item = this.map[i][j]
          // translate x,y=0
          if( item[1]!=0 ){
            this.map[i][j+item[1]][0] = item[0]
            this.map[i][j] = [0, 0, 0]
          }
          if( item[2]!=0 ){
            this.map[i+item[2]][j][0] = item[0]
            this.map[i][j] = [0, 0, 0]
          }
        }
      }
      this.isA = false
      this.map.splice(0, 0)
      this.ok = true
      this.randCeil()
    },
    // to right  to bottom
    repaintRb () {
      for (let i = this.map.length - 1; i>=0; i--) {
        for (let j = this.map[i].length - 1; j>=0; j--) {
          let item = this.map[i][j]
          if (item[1]!=0) {
            this.map[i][j+item[1]][0] = item[0]
            this.map[i][j] = [0, 0, 0]
          }
          if (item[2]!=0) {
            this.map[i+item[2]][j][0] = item[0]
            this.map[i][j] = [0, 0, 0]
          }
        }
      }
      this.isA = false
      this.map.splice(0, 0)
      this.ok = true
      this.randCeil()
    },

    moveRight () {
      if(this.ok == false){
        return;
      }
      this.ok = false
      this.isA = true
      let flag = false
      for (let i = 0; i < this.map.length; i++) {
        let count = 0, last, lastj;
        for (let j = this.map[i].length - 1; j>=0; j--) {
          // 是否为数字块
          if (this.map[i][j][0] == 0) {
            count++
          }else{
            if( this.map[i][j][0] == last ){
              count++
              this.map[i][j][0] = last*2 //*2
              //this.map[i][lastj][0] = 0
            }
            last = this.map[i][j][0]
            lastj = j

            if (count!=0) {
              flag = true
              this.map[i][j][1] = count
            }
          }
        }
      }

      this.map.splice(0, 0)
      flag ? setTimeout( ()=>this.repaintRb(), this.anim) : this.ok = true
    },
    moveLeft () {
      if(this.ok == false){
        return;
      }
      this.ok = false
      this.isA = true
      let flag = false
      for (let i = 0; i < this.map.length; i++) {
        let count = 0, last, lastj;
        for (let j = 0; j < this.map[i].length; j++) {
          // 是否为数字块
          if (this.map[i][j][0] == 0) {
            count++
          }else{
            if( this.map[i][j][0] == last ){
              count++
              this.map[i][j][0] = last*2 //*2
            }
            last = this.map[i][j][0]
            lastj = j

            if (count!=0) {
              flag = true
              this.map[i][j][1] = -count
            }
          }
        }
      }

      this.map.splice(0, 0)
      flag ? setTimeout( ()=>this.repaintLt(), this.anim) : this.ok = true
    },

    moveTop () {
      if(this.ok == false){
        return;
      }
      this.ok = false
      this.isA = true
      let flag = false
      for (let j = 0; j < this.map[0].length; j++) {
        let count = 0, last, lasti;
        for (let i = 0; i < this.map.length; i++) {
          // 是否为数字块
          if (this.map[i][j][0] == 0) {
            count++
          }else{
            if( this.map[i][j][0] == last ){
              count++
              this.map[i][j][0] = last*2 //*2
            }
            last = this.map[i][j][0]
            lasti = i

            if (count!=0) {
              flag = true
              this.map[i][j][2] = -count
            }
          }
        }
      }

      this.map.splice(0, 0)
      flag ? setTimeout( ()=>this.repaintLt(), this.anim) : this.ok = true
    },

    moveBottom () {
      if(this.ok == false){
        return;
      }
      this.ok = false
      this.isA = true
      let flag = false
      for (let j = 0; j < this.map[0].length; j++) {
        let count = 0, last, lasti;
        for (let i = this.map.length-1; i >=0 ; i--) {
          // 是否为数字块
          if (this.map[i][j][0] == 0) {
            count++
          }else{
            if( this.map[i][j][0] == last ){
              count++
              this.map[i][j][0] = last*2 //*2
            }
            last = this.map[i][j][0]
            lasti = i

            if (count!=0) {
              flag = true
              this.map[i][j][2] = count
            }
          }
        }
      }

      this.map.splice(0, 0)
      flag ? setTimeout( ()=>this.repaintRb(), this.anim) : this.ok = true
    }
  }
}
</script>

<style lang="less" scoped>
@wid: 110px;
@anim: .3s;

.x{
  position: absolute;
  top: 10%;
  left: 50%;
  margin-left: -@wid*2-4*8px;
  padding: 8px;
  width: @wid*4 + 8*8px;
  height: @wid*4 + 8*8px;
}

.hello{
  position: relative;
  height: 90%;
  .back{
    .x;
    background: #BBADA0;
    font-size: 0;
    border-radius: 10px;

    .backceil{
      display: inline-block;
      margin: 8px;
      width: @wid;
      height: @wid;
      border-radius: 6px;
      background: #CCC0B3;
    }
  }
  .game{
    .x;
    .line{
      margin-bottom: 16px;
      height: @wid;
    }
    .ceil{
      display: inline-block;
      vertical-align: top;
      margin: 8px;
      width: @wid;
      height: @wid;
      line-height: @wid;

      border-radius: 6px;
      background: #EDE0C8;
      text-align: center;
      color: #776e65;
      font-size:60px;
      visibility: hidden;
    }

    .trans{
      transition: all @anim ease;
    }
    .visib{
      visibility: visible;
    }
    .color{
      color: #fff;
    }
    .font{
      font-size: 40px;
    }
  }
}
</style>
