<template>
    <div>
        <div class="back-link"><a href="#"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back to cart</a></div>
        <div class="cover form-delivery">
            <form @submit.prevent="submit">
                <div class="col-9">
                    <div class="header-delivery">
                      <h4><span>Delivery details</span></h4>
                    </div>
                    <div class="col-6">
                        <form-group :validator="$v.email" label="Email">
                          <input type="text" id="email" name="email" v-model="email" placeholder="Input your email address" :class="{'is-invalid': $v.email.$error}">
                        </form-group>
                        <form-group :validator="$v.phone_number" label="Phone number">
                          <input type="text" id="phone" name="phone" v-model="phone_number" placeholder="Input your phone number" maxlength="20" @keypress="onlyNumber" :class="{'is-invalid': $v.phone_number.$error}">
                        </form-group>
                        <form-group :validator="$v.address" label="Delivery address">
                          <textarea id="address" name="address" rows="4" cols="50" maxlength="120"  placeholder="Input your address" v-model="address" :class="{'is-invalid': $v.address.$error}" @keyup='remaincharCount()'></textarea>
                          <span class="charNum">{{ remaincharactersText }}</span>
                        </form-group>
                    </div>
                    <div class="col-6 dropshipper-padding" v-if="dropshipValue == true">                        
                        <div class="dropshipper-check">
                          <input type="checkbox" id="dropship" name="dropship" v-model="dropshipValue" @click="dropshipCheck()">
                          <label for="dropship">Send as dropshipper</label>
                        </div>
                        <form-group :validator="$v.dropshipper_name" label="Dropshipper name">
                          <input type="text" id="dropshipper-name" name="dropshipper-name" v-model="dropshipper_name" required>
                        </form-group>
                        <form-group :validator="$v.dropshipper_phone" label="Dropshipper phone number">
                          <input type="text" id="dropshipper-phone" name="dropshipper-phone" maxlength="20" onkeypress="return validateNumber(event)" v-model="dropshipper_phone" required>
                        </form-group>
                    </div>
                    <div class="col-6 dropshipper-padding" v-else>                      
                        <div class="dropshipper-check">
                          <input type="checkbox" id="dropship" name="dropship" v-model="dropshipValue" @click="dropshipCheck()">
                          <label for="dropship">Send as dropshipper</label>
                        </div>
                        <div class="form-group">
                          <label class="">Dropshipper name</label>
                          <input type="text" id="Dropshipperdisable-name" name="Dropshipperdisable-name" disabled>
                        </div>
                        <div class="form-group">
                          <label class="">Dropshipper phone number</label>
                          <input type="text" id="Dropshipperdisable-phone" name="Dropshipperdisable-phone" disabled>
                        </div>
                    </div>

                </div>
                <div class="col-3 summary">
                    <div class="title-summary">Summary</div>
                    <div class="items">10 items purchased</div>
                    <div class="spacing"></div>
                    <table>
                        <tr>
                            <td class="titletd">Cost of goods</td>
                            <td class="right-text">{{formatPrice(subtotal)}}</td>
                        </tr>
                        <tr v-if="fee_dropship !== 0">
                            <td class="titletd">Dropshipping Fee</td>
                            <td class="right-text">{{formatPrice(fee_dropship)}}</td>
                        </tr>
                        <tr class="total-order">
                            <td>Total</td>
                            <td class="right-text">{{formatPrice(subtotal+fee_dropship)}}</td>
                        </tr>
                    </table>
                    <button class="btn">Continue to payment</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import { notGmail, notPhone } from '../validator';

export default {
  name: 'Delivery',
  data() {
		return {
      dropshipValue:false,
      subtotal: 500000,
      fee_dropship: 0,
      total:'',
			email: '',
			phone_number: '',
      address: '',
      maxcharacter: 120,
      remaincharactersText: " ",
      dropshipper_name: '',
      dropshipper_phone: '',
		}
  },
  validations: {
		email: {
			required,
			email,
			maxLength: maxLength(50)
		},
    phone_number: {
			required,notPhone
    },    
		address: {
			required,
			minLength: minLength(4),
		},
		// dropshipper_name: {
		// 	minLength: minLength(6)
    // },
    // dropshipper_phone: {
		// 	notPhone,
    //   minLength: minLength(6),      
		// 	maxLength: maxLength(20)
		// }
  },
  mounted() {
    if(localStorage.email) this.email = localStorage.email;
    if(localStorage.phone_number) this.phone_number = localStorage.phone_number;
    if(localStorage.address) this.address = localStorage.address;
  },
  watch:{
    email(newEmail) {
      localStorage.email = newEmail;
    },
    phone_number(newPhone_number) {
      localStorage.phone_number = newPhone_number;
    },
    address(newAddress) {
      localStorage.address = newAddress;
    }
  },
  methods: {
    onlyNumber () {
      this.phone_number = this.phone_number.replace(/[^0-9,+,-]/g, '');
      this.$v.$touch();
			if(this.$v.$error) return
    },
    dropshipCheck(){
      if(this.dropshipValue == false){
          this.fee_dropship= 5900
      }else {
          this.fee_dropship= 0
      }
    },
    formatPrice(value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    remaincharCount: function(){
      if(this.address.length > this.maxcharacter){
        this.remaincharactersText = +this.maxcharacter;
      }else{
        var remainCharacters = this.maxcharacter - this.address.length;
        this.remaincharactersText = remainCharacters;
      } 
    },
		submit() {
			this.$v.$touch(); //VALIDASI DIJALANKAN
			if(this.$v.$error) return //APABILA ERROR MAKA STOP
      this.$router.push({path: '/payment', query: {subtotal: this.subtotal, fee_dropship:this.fee_dropship}})
			alert('Form submitted') //APABILA BERHASIL MENAMPILKAN ALERT
		}
	}
}
</script>
<style>
@import "../assets/style/font-awesome.min.css";
</style>
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
          
    .error::after
        position: absolute
        top 30%   
        right 20px
        font: normal normal normal 14px/1 FontAwesome;
        content "\f00d"
        color: #FF8A00
        font-size: 14px
      .header-delivery
        position relative
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

      .dropshipper-padding
        position relative
        padding 0 40px
        .dropshipper-check
          position absolute
          top -50px
          right 12%
          font-size 12px
          #dropship
            margin 0
            margin-right 5px
            vertical-align middle 

          @media (max-width:768px)
            top -25px
          @media (max-width:600px)
            position relative
            margin 20px 0
            top auto
            right auto
        @media (max-width:1024px)
          padding 0 15px
        @media (max-width:600px)
          padding 0 0

      .summary
        padding-left 20px
        border-left 1px solid rgba(255, 138, 0, 0.2)
        @media (max-width:600px)
          padding-left 0
          border-left none
          margin-top 40px
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