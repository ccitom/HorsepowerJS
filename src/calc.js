var module = angular.module("calc", []);

module.directive('fixedNum', function() {
    return {
        restrict: 'EAC',
        require: 'ngModel',
        link: function(scope, element, attr, controller) {

            renderview = function(viewValue){
                var num;
                num = viewValue * 1;
                if (viewValue === '') {
                    element.text('');
                } else {
                    var txt = num.toFixed(1);
                    element.val(num.toFixed(1));
                }
            };

            controller.$render = function() {
                console.log("directive render");
                value = controller.$viewValue;
                element.val(value);
                renderview(value);
            };
        }
    };
});

module.controller("CalcCtrl", function ($scope) {
//    $scope.qty = new QuantityVM(new Quantity(12));
    $scope.qty = new Quantity(12);
});

function QuantityVM(qty) {
    this.model = qty;

    Object.defineProperty(this, "dozens", {
        get: function(){
            return this.model.dozens.toFixed(1);
        },
        set: function(val) {
            this.model.dozens = val;
        }
    });

        Object.defineProperty(this, "qty",{
        get: function(){
            return this.model.qty.toFixed(1);
        },
        set: function(val){
            this.model.setQty(val);
        }
    });

    Object.defineProperty(this, "product", {
        get: function() {
            return this.dozens * this.qty;
        }
    });
}

function Quantity(numOfPcs) {
    var dozens = numOfPcs / 12;

//    this.qty = parseFloat(qty);
    this.qty = numOfPcs;
    dozens = numOfPcs / 12;

    this.setQty = function(val){
        this.qty = parseFloat(val);
        dozens = this.qty / 12;
    };

//    Object.defineProperty(this, "qty",{
//        get: function(){
//            return qty;
//        },
//        set: function(val){
//            val = parseFloat(val);
//            qty = val;
//            dozens = val / 12;
//        }
//    });

    Object.defineProperty(this, "dozens", {
       get: function(){
           return dozens;
       },
       set: function(val) {
           val = parseFloat(val);
           dozens = val;
           this.qty = dozens * 12;
       }
    });

    Object.defineProperty(this, "product", {
        get: function() {
            return dozens * this.qty;
        }
    })
};
