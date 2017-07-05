var vm = new Vue({
	el: "#app",
	data: {

		msg: 'wel come',
		productList: [],
		checkAllFlag: false,
		totalPrice: 0,
		delFlag: false,
		curProduct:{}
	},

	mounted: function() {
		this.cartView();
	}, //相当于jqurey里面的 ready

	filters: {
		formatMoney: function(value) {
			return '￥' + value.toFixed(2);
		}
	},

	methods: {
		cartView: function() {
			var _this = this;
			this.$http.get("data/cart.json", {
				"id": 123
			}).then(res => {

				_this.productList = res.body.result.productList;
				_this.totalMoney = res.body.result.totalMoney;

			});
		},

		redOne: function() {
			console.log(this.productList.productQuantity--);
			this.productQuantity--
		},
		changeQuantity: function(n, m) {
			if(m < 0) {
				if(n.productQuantity > 0)
					n.productQuantity += m
			} else {
				n.productQuantity += m
			}
			this.calTotalPrice();
           
		},

		selectProduct: function(item) {
			if(typeof item.checked == 'undefined') {
				this.$set(item, "checked", true)
			} else {
				item.checked = !item.checked;

			}

			this.calTotalPrice();
		},
		checkAll: function() {

			this.checkAllFlag = !this.checkAllFlag;
			var _this = this;
			this.productList.forEach(function(item, index) {
				if(typeof item.checked == 'undefined') {
					_this.$set(item, "checked", _this.checkAllFlag);
				} else {
					item.checked = _this.checkAllFlag
				}

			})

			this.calTotalPrice();
		},

		cancelCheckAll: function() {
			this.checkAllFlag = false;
			var _this = this;
			this.productList.forEach(function(item, index) {
				if(typeof item.checked == 'undefined') {
					_this.$set(item, "checked", _this.checkAllFlag);
				} else {
					item.checked = _this.checkAllFlag
				}
			})
			this.calTotalPrice();

		},
		calTotalPrice: function() {
			
			console.log(this)
			var _this = this;
			this.totalPrice = 0;
			this.productList.forEach(function(item, index) {

				if(item.checked) {
					_this.totalPrice += item.productQuantity * item.productPrice;
					console.log(_this.totalPrice)

				}

			})

		},
		delConfirm:function(item){
			this.curProduct=item;
			this.delFlag=true;
			
		},
		delProduct:function(){
			var index=this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1);
			this.delFlag=false
		}

	}
})

Vue.filter("money", function(value, type) {
	return '￥' + value.toFixed(2) + type

})