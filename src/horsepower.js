var app = angular.module("horsepower", []);

app.controller("HorsepowerCtrl", function ($scope, $filter) {
    $scope.winch = new WinchVM(new Winch());
    $scope.formattedReducerOutputTorque = $filter('number')($scope.winch.reducerOutputTorque, 0);
});


/**
 * A ViewModel to format the winch properties for display.
 * @param winch
 * @constructor
 */
function WinchVM(winch) {
    var model = winch;

    Object.defineProperty(this, "horsepower", {
        get: function() {
            return parseFloat(model.horsepower.toFixed(1));
        },
        set: function(val) {
            model.horsepower = parseFloat(val);
        }
    });

    Object.defineProperty(this, "motorRPM", {
        get: function() {
            return parseFloat(model.motorRPM.toFixed(1));
        },
        set: function(val) {
            model.motorRPM = parseFloat(val);
        }
    });

    Object.defineProperty(this, "reducerRatio", {
        get: function() {
            return parseFloat(model.reducerRatio.toFixed(1));
        },
        set: function(val) {
            model.reducerRatio = parseFloat(val);
        }
    });

    Object.defineProperty(this, "reducerRPM", {
        get: function() {
            return parseFloat(model.reducerRPM.toFixed(1));
        },
        set: function(val) {
            model.reducerRPM = parseFloat(val);
        }
    });

    Object.defineProperty(this, "reducerEfficiency", {
        get: function() {
            return parseFloat(model.reducerEfficiency.toFixed(1));
        },
        set: function(val) {
            model.reducerEfficiency = parseFloat(val);
        }
    });

    Object.defineProperty(this, "reducerOutputTorque",  {
        get: function() {
            return parseFloat(model.reducerOutputTorque.toFixed(1));
        },
        set: function(val) {
            model.reducerOutputTorque = parseFloat(val);
        }
    });

    Object.defineProperty(this, "reducerSprocket", {
        get: function() {
            return parseFloat(model.reducerSprocket.toFixed(0));
        },
        set: function(val) {
            model.reducerSprocket = parseFloat(val);
        }
    });

    Object.defineProperty(this, "drumSprocket", {
        get: function() {
            return parseFloat(model.drumSprocket.toFixed(0));
        },
        set: function(val) {
            model.drumSprocket = parseFloat(val);
        }
    });

    Object.defineProperty(this, "drumDiameter", {
        get: function() {
            return parseFloat(model.drumDiameter.toFixed(1));
        },
        set: function(val) {
            model.drumDiameter = parseFloat(val);
        }
    });

    Object.defineProperty(this, "drumTorque", {
        get: function() {
            return parseFloat(model.drumTorque.toFixed(1));
        },
        set: function(val) {
            model.drumTorque = parseFloat(val);
        }
    });

    Object.defineProperty(this, "drumToReducerRatio", {
        get: function() {
            return parseFloat(model.drumToReducerRatio.toFixed(1));
        }
    });

    Object.defineProperty(this, "pull", {
        get: function() {
            return parseFloat(model.pull.toFixed(1));
        },
        set: function(val) {
            model.pull = parseFloat(val);
        }
    });

    Object.defineProperty(this, "cableSpeed", {
        get: function() {
            return parseFloat(model.cableSpeed.toFixed(1));
        },
        set: function(val) {
            model.cableSpeed = parseFloat(val);
        }
    });

    Object.defineProperty(this, "drumRPM", {
        get: function() {
            return parseFloat(model.drumRPM.toFixed(1));
        }
    });
}