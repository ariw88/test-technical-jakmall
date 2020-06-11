<template>
  <div>
    <div class="cover form-delivery">
        <div class="col-9">
          <div class="finish-content">
             <div class="header-delivery">
                <h4><span>Thank you</span></h4>
                <div class="order-id">Order ID : {{order_id}}</div>
                <div class="courier-estimation">Your order will be delivered {{estimated}} by {{courier_selected}}</div>
                
                <div class="back-link">
                  <router-link v-bind:to="'/'"><i class="fa fa-arrow-left" aria-hidden="true"></i> Go to homepage</router-link>
                </div>
                
              </div>
          </div>
         
        </div>
        <div class="col-3 summary">
          <div class="title-summary">Summary</div>
          <div class="items">10 items purchased</div>
          <div class="spacing">
            <div class="summary-tab" v-if="courier_selected != ''">
              <span class="line"></span>
              <div class="title">Delivery estimation</div>
              <div class="value">{{estimated}} by {{courier_selected}}</div>
            </div>
            <div class="summary-tab" v-if="payment_name != ''">
              <span class="line"></span>
              <div class="title">Payment method</div>
              <div class="value">{{payment_name}}</div>
            </div>
          </div>
          <table>
            <tr>
              <td class="titletd">Cost of goods</td>
              <td class="right-text">{{formatPrice(subtotal)}}</td>
            </tr>
            <tr v-if="fee_dropship !== 0 ">
              <td class="titletd">Dropshipping Fee</td>
              <td class="right-text">{{formatPrice(fee_dropship)}}</td>
            </tr>
            <tr v-if="courier_selected !==''">
              <td class="titletd"><b>{{courier_selected}}</b> Shippment</td>
              <td class="right-text">{{formatPrice(courier_fee)}}</td>
            </tr>
            <tr class="total-order">
              <td>Total</td>
              <td class="right-text">{{formatPrice(total)}}</td>
            </tr>
          </table>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Payment',
    data(){
      return {
        total:0,
        subtotal:0,
        fee_dropship:0,
        ewallet_credit:'',
        courier_selected:'',
        estimated:'',
        courier_fee:'',
        payment_name:'',
        order_id:''
      }
    },    
    created() {
      this.subtotal = parseInt(this.$route.query.subtotal);
      this.fee_dropship = parseInt(this.$route.query.fee_dropship);
      this.courier_selected = this.$route.query.courier_selected;
      this.courier_fee = parseInt(this.$route.query.courier_fee);      
      this.estimated = this.$route.query.estimated;
      this.payment_name = this.$route.query.payment_name;
      this.total = this.subtotal+this.fee_dropship+this.courier_fee
      this.order_id = this.$route.query.order_id;
    },
    methods:{
      formatPrice(value) {
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      }
    }
  }

</script>
<style lang="stylus" scoped>
    
    .finish-content
      padding 5% 20%
      @media (max-width:600px)
          padding 5% 0
      .header-delivery
        margin-bottom 40px
        h4
          position relative
          margin 0
          font-family 'Montserrat'
          font-style normal
          font-weight bold
          max-width 300px
          width 100%
          height 40px
          font-size 36px
          line-height 44px
          color #FF8A00
          border-bottom 10px solid #EEEEEE
          @media (max-width:600px)
            font-size:30px
          span
            position absolute
            display inline-block
            left 0
            bottom -15px
            @media (max-width:600px)
              bottom -18px
      .order-id
        margin 40px 0 10px 0 
        font-size 14px
        line-height 16px
        color #000

      .courier-estimation
        margin-bottom 60px
        font-size 14px
        line-height 16px
        color rgba(0, 0, 0, 0.6)

      .back-link a
          font-family 'InterUI'
          text-decoration none
          font-size 14px
          line-height 16px
          color #000000
          opacity 0.6


    .summary
        padding-left 20px
        border-left 1px solid rgba(255, 138, 0, 0.2)
        @media (max-width:600px)
          padding-left 0
          border-left none
          padding-top 40px
          border-top 1px solid rgba(255, 138, 0, 0.2)

        .title-summary
          font-family 'Montserrat'
          font-size 24px
          color #FF8A00
          line-height 29px
      
        .items
          padding 10px 0
          font-family 'InterUI'
          font-size 14px
          line-height 16px
          color #000000
          mix-blend-mode normal
          opacity 0.6
        
        .summary-tab
          .line
            margin 21px 0
            display inline-block
            width 80px
            border-top 1px solid #D8D8D8
          .title
            font-size 14px
            line-height 16px
            margin-bottom 4px
          .value
            font-size 16px
            line-height 19px
            color #1BD97B
            
        .spacing
          height 200px

        table
          width 100%

          tr
            td
              padding 6px 0
              font-family 'InterUI'
              font-size 14px
              line-height 16px
              color #000000

            .titletd
              opacity 0.6

            .right-text              
              font-weight bold 
              text-align right 

          .total-order
            td
              padding 24px 0 
              font-family 'Montserrat'
              font-size 24px
              line-height 16px
              color #FF8A00
</style>
