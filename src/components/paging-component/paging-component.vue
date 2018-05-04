<template>
  <div id="table-page">
    <div class="box">
      <span class="prev" @click="goToPre" :class="{disabled: firstPage}"></span>
      <template v-for="number in numbers">
        <span class="pointer" v-if="!Number(number)"> {{number}}</span>
        <a v-else href="javascript:;" class="number" :class="{active: (number === pageNumber)}"
           @click="goToPage(number)">{{number}}</a>
      </template>
      <span class="next" :class="{disabled: lastPage}" @click="goToNext"></span>
      <span class="skip">
        <input type="text" min="1" v-model="givenPage">
        <span class="confirm" @click="goToGivenPage()">跳转</span>
      </span>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Page',
    data () {
      return {
        givenPage: null,
        isRepet: false
      }
    },
    props: {
      pageNumber: Number,
      pageSize: Number,
      total: Number,
      pages: Number
    },
    watch: {
      pageNumber: function (newP, oldP) {
        this.isRepet = false
      }
    },
    computed: {
      numbers: function () {
        let spr = '......'
        let numbers
        if (this.pages < 5 || (this.pageNumber === 3 && this.pages === 5)) {
          numbers = this.pages
        } else {
          if (this.pageNumber < 3) {
            numbers = [1, 2, 3, spr, this.pages]
          } else if (this.pageNumber > this.pages - 2) {
            numbers = [1, spr, this.pages - 2, this.pages - 1, this.pages]
          } else {
            if (this.pageNumber === 3) {
              numbers = [1, 2, 3, 4, spr, this.pages]
            } else if (this.pageNumber === 4 && this.pages === 6) {
              numbers = [1, spr, 3, 4, 5, 6]
            } else {
              numbers = [1, spr, this.pageNumber - 1, this.pageNumber, this.pageNumber + 1, spr, this.pages]
            }
          }
        }
        return numbers
      },
      firstPage: function () {
        return this.pageNumber <= 1
      },
      lastPage: function () {
        return this.pageNumber >= this.pages
      }
    },
    methods: {
      goToPage: function (number) {
        if (!Number(number)) return;
        if (number === this.pageNumber) {
          this.search(number, true)
        } else {
          this.search(number)
        }
      },
      goToGivenPage: function () {
        if (!Number(this.givenPage)) return;
        if (this.givenPage <= 0 || this.givenPage > this.pages) return
        this.goToPage(Number(this.givenPage))
      },
      goToPre: function () {
        if (this.firstPage) return
        this.search(this.pageNumber - 1)
      },
      goToNext: function () {
        if (this.lastPage) return
        this.search(this.pageNumber + 1)
      },
      search: function (pageNumber, reflesh) {
        if (reflesh) {
          this.$emit('pagingEvent', pageNumber)
        } else if (!this.isRepet) {
          this.isRepet = true
          this.$emit('pagingEvent', pageNumber)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  #table-page {
    text-align: right;
    font-size: 18px;
  }

  .box {
    display: inline-block;
    user-select: none;
    vertical-align: middle;
    .prev,
    .next {
      display: inline-block;
      width: 40px;
      height: 30px;
      cursor: pointer;
      vertical-align: middle;
    }
    .prev {
      background-image: url("./imgs/pre-active.png");
      &.disabled {
        background-image: url("./imgs/pre.png");
        cursor: not-allowed;
      }
    }
    .next {
      background-image: url("./imgs/next-active.png");
      &.disabled {
        background-image: url("./imgs/next.png");
        cursor: not-allowed;
      }
    }
    .pointer {
      color: #1789e1;
    }
    a {
      display: inline-block;
      color: #999;
      text-decoration: none;
      border: 1px solid #999999;
      /*width: 40px;*/
      min-width: 40px;
      height: 30px;
      line-height: 30px;
      margin: 0 5px;
      text-align: center;
      vertical-align: middle;
      border-radius: 2px;
      &.active {
        background-color: #1789e1;
        color: #fff;
        border-color: #2b71b8;
      }
      &:hover {
        background-color: #2b71b8;
        color: #fff;
        border-color: #2b71b8;
      }
    }
    input {
      display: inline-block;
      width: 50px;
      height: 30px;
      line-height: 30px;
      margin: 0 10px;
      text-align: center;
      border: 1px solid #999;
      border-radius: 2px;
      box-shadow: 1px 1px 2px #999 inset;
      &:focus {
        border-color: #1789e1 !important;
        outline: 0;
      }
    }
    .skip {
      display: inline-block;
      vertical-align: middle;
      .confirm {
        color: #1889e1;
        cursor: pointer;
        &:hover {
          color: #2b71b8;
        }
      }
    }
  }

</style>
