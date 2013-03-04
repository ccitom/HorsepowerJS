//                   Horsepower X 63025
//  Torque(in*lbs) = ------------------
//                       RPM

//                   Torque(in*lbs) X RPM
//      Horsepower = --------------------
//                          63025

//                   Horsepower X 63025
//             RPM = -------------------
//                       Torque(in*lbs)

function Winch() {
    var horsepower = 1.0;
    var motorRPM = 1750;
    var reducerRatio = 10.0;
    var reducerEfficiency = 85.0;
    var reducerSprocket = 30;
    var drumSprocket = 30;
    var drumDiameter = 10.0;

    Object.defineProperty(this, "horsepower", {
        get: function() {
            return horsepower;
        },
        set: function(val) {
            horsepower = parseFloat(val);
        }
    });

    Object.defineProperty(this, "motorRPM", {
        get: function() {
            return motorRPM;
        },
        set: function(val) {
            motorRPM = parseFloat(val);
        }
    });

    Object.defineProperty(this, "reducerRatio", {
        get: function() {
            return reducerRatio;
        },
        set: function(val) {
            reducerRatio = parseFloat(val);
        }
    });

    Object.defineProperty(this, "reducerRPM", {
        get: function() {
            return motorRPM / reducerRatio;
        },
        set: function(val) {
            var rpm = parseFloat(val);
            reducerRatio = motorRPM / rpm;
        }
    });

    Object.defineProperty(this, "reducerEfficiency", {
        get: function() {
            return reducerEfficiency;
        },
        set: function(val) {
            reducerEfficiency = parseFloat(val);
        }
    });

    Object.defineProperty(this, "reducerOutputTorque",  {
        get: function() {
            return ((63025 * this.horsepower) / this.reducerRPM) * (this.reducerEfficiency / 100.0) ;
        },
        set: function(val) {
            var efficiencyFactor = this.reducerEfficiency / 100.0;
            this.reducerRPM = (63025 * this.horsepower * efficiencyFactor) / parseFloat(val);
        }
    });

    Object.defineProperty(this, "reducerSprocket", {
        get: function() {
            return reducerSprocket;
        },
        set: function(val) {
            reducerSprocket = parseFloat(val);
        }
    });

    Object.defineProperty(this, "drumSprocket", {
        get: function() {
            return drumSprocket;
        },
        set: function(val) {
            drumSprocket = parseFloat(val);
        }
    });

    Object.defineProperty(this, "drumDiameter", {
        get: function() {
            return drumDiameter;
        },
        set: function(val) {
            drumDiameter = parseFloat(val);
        }
    });

    Object.defineProperty(this, "drumTorque", {
        get: function() {
            return this.reducerOutputTorque * this.drumToReducerRatio;
        },
        set: function(val) {
            this.reducerOutputTorque = parseFloat(val) / this.drumToReducerRatio;
        }
    });

    Object.defineProperty(this, "drumToReducerRatio", {
        get: function() {
            return this.drumSprocket / this.reducerSprocket;
        }
    });

    Object.defineProperty(this, "pull", {
        get: function() {
            return this.drumTorque / ( this.drumDiameter / 2 );
        },
        set: function(val) {
//            this.drumTorque = parseFloat(val) * ( this.drumDiameter / 2);
            var requiredTorque = parseFloat(val) * ( this.drumDiameter / 2);
            var efficiency = reducerEfficiency / 100.0;
            this.horsepower = ( requiredTorque * this.drumRPM ) / ( 63025 * efficiency);
        }
    });

    Object.defineProperty(this, "cableSpeed", {
        get: function() {
            var rps = this.drumRPM / 60.0;
            return this.drumCircumference() * rps;
        },
        set: function(val) {
            var rps = parseFloat(val) / this.drumCircumference();
            var requiredDrumRPM = rps * 60.0;
            var requiredTorque = this.drumTorque;
            var efficiency = reducerEfficiency / 100.0;

            this.reducerRatio = this.motorRPM / (requiredDrumRPM * this.drumToReducerRatio);
            this.horsepower = ( requiredTorque * this.drumRPM ) / ( 63025 * efficiency);
        }
    });

    Object.defineProperty(this, "drumRPM", {
        get: function() {
            return this.reducerRPM / this.drumToReducerRatio;
        }
    });

    this.drumCircumference = function(){
        return this.drumDiameter * Math.PI;
    };

}