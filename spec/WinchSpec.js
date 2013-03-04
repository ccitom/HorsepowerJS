describe("Winch", function(){
    var winch;

    beforeEach(function() {
        winch = new Winch();
    });

    it("should have sensible defaults", function() {
        expect(winch.horsepower).toBeCloseTo(1.0);
        expect(winch.motorRPM).toEqual(1750);
        expect(winch.reducerRatio).toBeCloseTo(10.0);
        expect(winch.reducerRPM).toBeCloseTo(175.0);
        expect(winch.reducerEfficiency).toBeCloseTo(85.0);
        expect(winch.reducerOutputTorque).toBeCloseTo((63025 / 175.0) * 0.85);
        expect(winch.reducerSprocket).toEqual(30);
        expect(winch.drumSprocket).toEqual(30);
        expect(winch.drumDiameter).toBeCloseTo(10.0);
        expect(winch.drumTorque).toBeCloseTo((63025 / 175.0) * 0.85);
        expect(winch.pull).toBeCloseTo( ((63025 / 175.0) * 0.85) / (10.0 / 2));
        expect(winch.cableSpeed).toBeCloseTo((Math.PI * 10) * ( 175.0 / 60.0));
    });

    it("should compute drum to reducer ratio", function() {
        expect(winch.drumToReducerRatio).toBeCloseTo(1.0);

        winch.drumSprocket = 50;
        winch.reducerSprocket = 25;

        expect(winch.drumToReducerRatio).toBeCloseTo(2.0);

        winch.drumSprocket = 60.0;

        expect(winch.drumToReducerRatio).toBeCloseTo(60.0 / 25.0);
    });

    it("should compute drum rpm", function (){
        expect(winch.drumRPM).toEqual(winch.reducerRPM);

        winch.drumSprocket = 50;
        winch.reducerSprocket = 25;

        expect(winch.drumRPM).toBeCloseTo(winch.reducerRPM / 2.0);
    });

    it("should double pull when horsepower doubles", function() {
        var oldPull = winch.pull;
        winch.horsepower = 2.0;
        expect(winch.pull).toBeCloseTo(oldPull * 2);
    });

    it("should double cableSpeed when motorRPM doubles", function() {
        var oldSpeed = winch.cableSpeed;
        winch.motorRPM = 3500;
        expect(winch.cableSpeed).toBeCloseTo(oldSpeed * 2.0);
    });

    it("should halve pull when motorRPM doubles", function() {
        var oldPull = winch.pull;
        winch.motorRPM = 3500;
        expect(winch.pull).toBeCloseTo(oldPull / 2.0);
    });

    it("should halve speed when reducerRatio doubles", function() {
        var oldSpeed = winch.cableSpeed;
        winch.reducerRatio = 20.0;
        expect(winch.cableSpeed).toBeCloseTo(oldSpeed / 2.0);
    });

    it("should double pull when reducerRatio doubles", function() {
        var oldPull = winch.pull;
        winch.reducerRatio = 20.0;
        expect(winch.pull).toBeCloseTo(oldPull * 2.0);
    })

    it("should halve pull when reducerEfficiency halves", function () {
        var oldPull = winch.pull;
        winch.reducerEfficiency = 42.5;
        expect(winch.pull).toBeCloseTo(oldPull / 2.0);
    });

    it("should halve pull when reducerSprocket doubles", function() {
        var oldPull = winch.pull;
        winch.reducerSprocket = 60;
        expect(winch.pull).toBeCloseTo(oldPull / 2.0);
    });

    it("should double pull when drumSprocket doubles", function() {
        var oldPull = winch.pull;
        winch.drumSprocket = 60;
        expect(winch.pull).toBeCloseTo(oldPull * 2.0);
    });

    it("should double pull when drumDiameter halves", function() {
        var oldPull = winch.pull;
        winch.drumDiameter = 5.0;
        expect(winch.pull).toBeCloseTo(oldPull * 2.0);
    });

    it("should double the reducerRatio when the reducerRPM is halved", function() {
        var oldRatio = winch.reducerRatio;
        winch.reducerRPM = winch.reducerRPM / 2;
        expect(winch.reducerRatio).toBeCloseTo(oldRatio * 2.0);
    });

    it("should double the reducerRatio when the reducerTorque doubles", function(){
        var oldRatio = winch.reducerRatio;
        winch.reducerOutputTorque = winch.reducerOutputTorque * 2;
        expect(winch.reducerRatio).toBeCloseTo(oldRatio * 2);
    });

    it("should double the reducerRatio when the drumTorque doubles", function(){
        var oldRatio = winch.reducerRatio;
        winch.drumTorque = winch.drumTorque * 2;
        expect(winch.reducerRatio).toBeCloseTo(oldRatio * 2);
    });

    it("should double the horsepower when the pull doubles", function(){
        var oldHP = winch.horsepower;
        winch.pull = winch.pull * 2;
        expect(winch.horsepower).toBeCloseTo(oldHP * 2);
    });

    it("should double the horsepower and halve reducerRatio when cableSpeed doubles", function(){
        var oldHP = winch.horsepower;
        var oldRatio = winch.reducerRatio;
        winch.cableSpeed = winch.cableSpeed * 2;
        expect(winch.horsepower).toBeCloseTo(oldHP * 2);
        expect(winch.reducerRatio).toBeCloseTo(oldRatio / 2);
    })
});