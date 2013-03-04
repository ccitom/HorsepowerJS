/**
 * Created with IntelliJ IDEA.
 * User: Gareth
 * Date: 2/25/13
 * Time: 12:04 PM
 * To change this template use File | Settings | File Templates.
 */
function CalcCtrl($scope) {
    var num = 0.0;
    $scope.qty = new Quantity(12);
    $scope.num = num;
};

function Quantity(numOfPcs) {
    var qty = numOfPcs;
    var dozens = numOfPcs / 12;

    Object.defineProperty(this, "qty",{
        get: function(){
            return qty;
        },
        set: function(val){
            val = parseFloat(val);
            qty = val;
            dozens = val / 12;
        }
    });

    Object.defineProperty(this, "dozens", {
       get: function(){
           return dozens;
       },
       set: function(val) {
           val = parseFloat(val);
           dozens = val;
           qty = dozens * 12;
       }
    });

    Object.defineProperty(this, "product", {
        get: function() {
            return dozens * qty;
        }
    })
};
