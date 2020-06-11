<template>
  <div>
    <div class="back-link">
      <router-link v-bind:to="'/'"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back to delivery</router-link>
    </div>
    <div class="cover form-delivery">
      <form @submit.prevent="submit">
        <div class="col-9">
          <div class="header-delivery">
            <h4><span>Shippment</span></h4>
            <div class="formGroup">
              <ul>
                <li v-for="courier in couriers" :key="courier.id">
                  <label :for="courier.id">
                    <input type="radio" :id="courier.id" name="courier" :value="courier.name" v-model="courierCheck" @click="clickCourier(courier)" required> 
                    <span class="content">
                      {{courier.name}}
                      <span class="fee">{{courier.fee}}</span>
                    <span class="checkmark"><i class="fa fa-check" aria-hidden="true"></i></span>
                    </span> 
                  </label>
                </li>
              </ul>              
            </div>

            <h4><span>Payment</span></h4>
            <div class="formGroup">
              <ul>
                <li v-for="payment in payments" :key="payment.id">
                  <label :for="payment.id" v-if="payment.id == 'ewallet'">
                    <input type="radio" :id="payment.id" name="paymentMethod" :value="payment.name"  v-model="paymentCheck" @click="clickPayment(payment)" required> 
                    <span class="content">
                      {{payment.name}}
                      <span class="fee">{{ewallet_credit}} left</span>
                      <span class="checkmark"><i class="fa fa-check" aria-hidden="true"></i></span>
                    </span> 
                  </label>

                  <label :for="payment.id" v-else>
                    <input type="radio" :id="payment.id" name="paymentMethod" :value="payment.name"  v-model="paymentCheck" @click="clickPayment(payment)" required> 
                    <span class="content other">
                      {{payment.name}}                      
                      <span class="checkmark"><i class="fa fa-check" aria-hidden="true"></i></span>
                    </span> 
                  </label>
                </li>
              </ul>              
            </div>
            
          </div>

        </div>
        <div class="col-3 summary">
          <div class="title-summary">Summary</div>
          <div class="items">10 items purchased</div>
          <div class="spacing">
          <div class="summary-tab" v-if="courier_selected != ''">
            <span class="line"></span>
            <div class="title">Delivery Estimation</div>
            <div class="value">{{estimated}} by {{courier_selected}}</div>
          </div>

          </div>
          <table>
            <tr>
              <td class="titletd">Cost of goods</td>
              <td class="right-text">{{formatPrice(subtotal)}}</td>
            </tr>
            <tr v-if="fee_dropship !==0">
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
          <button class="btn">Pay with {{payment_name}}</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Payment',
    data(){
      return {
        subtotal:0,
        fee_dropship:0,
        courierCheck:'',
        paymentCheck:'',
        ewallet_credit:1500000,
        courier_selected:'',
        estimated:'',
        courier_fee:'',
        payment_name:'',
        total:'',
        order_id:'',
        couriers :[
          { id: "go-send", name : "Go-SEND", fee : "15000", estimation : "Today" },
          { id: "jne", name : "JNE", fee : "9500", estimation : "2 Days" },
          { id: "personal", name : "Personal Courier", fee : "29000", estimation : "1 Days" }
        ],
        payments :[
          { id: "ewallet", name : "E-Wallet"},
          { id: "banktransfer", name : "Bank Transfer" },
          { id: "virtualaccount", name : "Virtual Account"}
        ]
      }
    },
    created() {
      this.subtotal = parseInt(this.$route.query.subtotal);
      this.fee_dropship = parseInt(this.$route.query.fee_dropship);
      this.total = this.subtotal + this.fee_dropship
    },
    mounted() {
      if(localStorage.courierCheck)this.courierCheck = localStorage.courierCheck;
      if(localStorage.paymentCheck) this.paymentCheck = localStorage.paymentCheck;      
      if(localStorage.courier_selected) this.courier_selected = localStorage.courier_selected;
      if(localStorage.estimated) this.estimated = localStorage.estimated;
      if(localStorage.courier_fee) this.courier_fee = localStorage.courier_fee;
      if(localStorage.payment_name) this.payment_name = localStorage.payment_name;
      if(localStorage.total) this.total = localStorage.total;
    },
    watch:{
      courierCheck(newcourierCheck) {
        localStorage.courierCheck = newcourierCheck;
      },
      paymentCheck(newpaymentCheck) {
        localStorage.paymentCheck = newpaymentCheck;
      },
      courier_selected(newcourier_selected) {
        localStorage.courier_selected = newcourier_selected;
      },
      estimated(newestimated) {
        localStorage.estimated = newestimated;
      },
      courier_fee(newcourier_fee) {
        localStorage.courier_fee = newcourier_fee;
      },
      payment_name(newpayment_name) {
        localStorage.payment_name = newpayment_name;
      },
      total(newtotal) {
        localStorage.total = newtotal;
      }
    },
    methods:{
      formatPrice(value) {
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      },
      clickCourier(courier){
        this.courier_selected = courier.name
        this.estimated = courier.estimation
        this.courier_fee = parseInt(courier.fee);
        this.total = this.subtotal + this.fee_dropship+this.courier_fee;
      },
      clickPayment(payment){
        this.payment_name = payment.name
      },
      submit() {
        // this.$v.$touch(); //VALIDASI DIJALANKAN
        // if(this.$v.$error) return //APABILA ERROR MAKA STOP
        
        function randomString(length, chars) {
          var result = '';
          for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
          return result;
        }
        this.order_id=randomString(5, '23456789ABCDEFGHJKLMNPQRSTUVWXYZ')
        this.$router.push({path: '/success', query: {order_id:this.order_id, subtotal: this.subtotal, fee_dropship:this.fee_dropship, courier_fee: this.courier_fee, courier_selected: this.courier_selected, estimated: this.estimated, payment_name: this.payment_name,}})
        alert('Form submitted') //APABILA BERHASIL MENAMPILKAN ALERT
      }
    }
  }

</script>
<style lang="stylus" scoped>

    .back-link
      a
        font-family 'InterUI'
        text-decoration none
        font-size 14px
        line-height 16px
        color #000000
        opacity 0.6
    
    .form-delivery
      margin-top 20px
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

      .formGroup
        margin 20px 0
        ul
          margin 0
          padding-left 0
          li
            display inline-block
            list-style none
            text-align center
            vertical-align: top;
            padding 8px 20px 8px 0
            label 
              display inline-block
              cursor pointer
              font-size 12px
              color #222222
              position relative
              input 
                position absolute
                opacity 0
                cursor pointer
                height 0
                width 0
                ~ .content
                  display block
                  width 180px
                  height 60px
                  text-align left 
                  padding 10px
                  font-size 13px
                  vertical-align middle
                  color rgba(0, 0, 0,0.6)
                  background-color transparent
                  border 1px solid #CCCCCC
                  &.other
                    padding 20px 10px !important 
                  .fee
                    font-size 16px
                    display block
                  .checkmark
                    display none
              input:checked ~ .content 
                font-weight bold
                color rgba(0, 0, 0,0.8)
                background rgba(27, 217, 123, 0.1)
                border 2px solid #1BD97B
              input:checked ~ .content .checkmark
                display inline-block
                position absolute
                right 10px
                top 34%
                color #1bd97b


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
