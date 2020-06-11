<template>
  <div id="app">

    <div class="container">
      <div class="stepper-bg">
        <ul>
          <li class="active"><span>1</span>Delivery</li>
          <li id="payment"><span>2</span>Payment</li>
          <li id="success"><span>3</span>Finish</li>
        </ul>
      </div>

      <router-view></router-view>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'app', 
  watch: {
    $route: ["changeRoute"],
  },
  mounted() {
    this.changeRoute()
  }, 
  methods:{
    changeRoute() {
      let routePath = this.$route.path

      if (routePath === '/payment'){
        document.getElementById("payment").classList.add("active");
        document.getElementById("success").classList.remove("active");
      }
      else if (routePath === '/success'){
        document.getElementById("payment").classList.add("active");
        document.getElementById("success").classList.add("active");
      }
      else{
        document.getElementById("payment").classList.remove("active");
        document.getElementById("success").classList.remove("active");
      }
    }
  }
}
</script>
<style>
@import "./assets/style/font-awesome.min.css";
</style>
<style lang="stylus">
@import "./assets/style/main.stylus";
#app 
  float left
  width 100%
  padding 50px 100px
  font-size 18px
  color black

  @media (max-width:1024px)
    padding 50px 20px
  @media (max-width:1024px)
    padding 50px 10px

  .container
    float left
    width 100%
    margin auto
    position relative
    background #FFFFFF
    padding 50px 20px 20px 20px
    box-shadow 2px 10px 20px rgba(255, 138, 0, 0.1)
    border-radius 4px

    .back-link
      a
        font-family 'InterUI'
        text-decoration none
        font-size 14px
        line-height 16px
        color #000000
        opacity 0.6

    .stepper-bg
      position absolute
      width 500px
      left 350px
      top -20px
      background #FFFAE6
      border-radius 35px
      text-align center
      padding 10px 20px
      @media (max-width:1024px)
        left 25%
      @media (max-width:768px)
        left 15%
      @media (max-width:600px)
        width 350px
        padding 10px 5px
        left 5%
      @media (max-width:376px)
        width 342px
        padding 10px 5px
        left 7px
      @media (max-width:321px)
        width 285px
        padding 10px 5px
        left 7px
      ul
        margin 0
        padding-left 0
        li
          float left
          width 33%
          position relative
          list-style none
          text-align center
          font-family 'InterUI'
          font-size 16px
          line-height 19px
          color #FF8A00

          @media (max-width:600px)
            font-size 12px

          span 
            display inline-block
            vertical-align middle
            margin-right 10px
            width 30px
            height 30px
            padding 6px
            background rgba(255, 138, 0, 0.2)
            color #FF8A00
            border-radius 50%
            @media (max-width:321px)
              display inline-block
              margin-right 5px
              width 20px
              height 20px
              padding 1px

        li::after
          position absolute
          top 5px
          right -5px
          content '>'
          font-size 20px
          @media(max-width :321px)
            top 1px
            font-size: 14px;

        li.active
          span             
            background rgba(255, 138, 0, 1)
            color #FFF
        
        li:last-child::after
          display none

</style>

