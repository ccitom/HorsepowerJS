/**
 * Created with IntelliJ IDEA.
 * User: Gareth
 * Date: 2/25/13
 * Time: 10:54 AM
 * To change this template use File | Settings | File Templates.
 */
function HorsepowerCtrl($scope, $filter) {
    $scope.winch = new Winch();
    $scope.winch.reducerOutputTorque = $filter('number')($scope.winch.reducerOutputTorque, 0);
}