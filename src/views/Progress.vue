<template>
  <div class="progress-page">
    <p>基本用法</p>
    <div>
      <DrProgress :percent="25"></DrProgress>
      <br>
      <br>
      <DrProgress :percent="100" status="success"></DrProgress>
      <br>
      <br>
      <DrProgress :percent="100" status="warning"></DrProgress>
      <br>
      <br>
      <DrProgress :percent="75" status="error"></DrProgress>
      <br>
      <br>
      <DrProgress :percent="100" :showText="false">100%</DrProgress>
    </div>
    <p>百分比内显</p>
    <div>
      <DrProgress :percent="25" :strokeWidth="26" textInside></DrProgress>
      <br>
      <br>
      <DrProgress :percent="55" :strokeWidth="24" status="active" textInside></DrProgress>
      <br>
      <br>
      <DrProgress :percent="75" status="error" :strokeWidth="22" textInside></DrProgress>
      <br>
      <br>
      <DrProgress :percent="100" status="success" :strokeWidth="20" textInside></DrProgress>
    </div>
    <p>更改进度条颜色/渐变色</p>
    <div>
      <DrProgress :percent="100" strokeColor="#E066FF" :strokeWidth="20"></DrProgress>
      <br>
      <br>
      <DrProgress :percent="100" :strokeColor="strokeColor" :strokeWidth="20"></DrProgress>
    </div>
    <p>进度环</p>
    <div class="progress-circle">
      <DrProgress :percent="0" type="circle"></DrProgress>
      <DrProgress :percent="25" type="circle"></DrProgress>
      <DrProgress :percent="100" type="circle" status="success"></DrProgress>
      <DrProgress :percent="75" type="circle" status="warning"></DrProgress>
      <DrProgress :percent="50" type="circle" status="error"></DrProgress>
    </div>
    <p>动态进度条(环)/动态更改颜色</p>
    <div class="progress-dashboard">
      <DrProgress :percent="progressPersent" :strokeWidth="20" textInside></DrProgress>
      <br>
      <br>
      <DrProgress :percent="progressPersent" :progressColor="customColors" :strokeWidth="20" textInside></DrProgress>
      <br>
      <br>
      <DrProgress :percent="progressPersent" type="circle"></DrProgress>
      <DrProgress :percent="progressPersent" :progressColor="customColors" type="circle"></DrProgress>
      <DrProgress :percent="progressPersent" :progressColor="customColors" type="dashboard"></DrProgress>
      <br>
      <br>
      <DrButtonGroup>
        <DrButton icon="dr-icon-move" @click="handleMinus"></DrButton>
        <DrButton icon="dr-icon-add" @click="handleAdd"></DrButton>
      </DrButtonGroup>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      progressPersent: 20,
      strokeColor: ['#E066FF', '#CDCD00', '#CD2626'],
      customColors: [
        {
          color: '#f56c6c',
          percent: 20
        },
        {
          color: '#e6a23c',
          percent: 40
        },
        {
          color: '#5cb87a',
          percent: 60
        },
        {
          color: '#ed4014',
          percent: 80
        },
        {
          color: '#6f7ad3',
          percent: 100
        }
      ]
    };
  },
  methods: {
    handleAdd() {
      if (this.progressPersent >= 100) {
        this.progressPersent = 100;
      } else {
        this.progressPersent += 10;
      }
    },
    handleMinus() {
      if (this.progressPersent <= 0) {
        this.progressPersent = 0;
      } else {
        this.progressPersent -= 10;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .progress-page {
    margin: 20px auto 100px;
    > p {
      margin: 0 auto;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    > div {
      width: 400px;
      margin: 20px auto;
      &.progress-circle {
        width: 800px;
        text-align: center;
      }
      &.progress-dashboard {
        width: 500px;
        text-align: center;
      }
      > p {
        margin: 20px 0;
        text-align: center;
      }
      > div {
        margin-right: 20px;
      }
    }
  }
</style>
