(function() {

    var newGravity;
    var currentGravity;
    var diffGravity;
    // var orientation;
    var entity;
    
    var quarterTurn = 90;
    
    var Gravity = function() {};

    Gravity.prototype = {

        preload: function(entityID) {
            entity = entityID;
        },

        changeGrav: function() {
            newGravity = JSON.parse(Entities.getEntityProperties(entity, 'userData').userData).gravity;
            currentGravity = MyAvatar.gravity;
            // orientation = MyAvatar.orientation;
            diffGravity = Vec3.subtract(newGravity, currentGravity);            
            MyAvatar.gravity = newGravity;
            MyAvatar.orientation = Quat.fromVec3Degrees(Vec3.multiply(quarterTurn, Vec3.normalize(diffGravity)));
        },

        clickDownOnEntity: function() {
            this.changeGrav();
        },

        startNearTrigger: function() {
            this.changeGrav();
        },

        startFarTrigger: function() {
            this.changeGrav();
        }

    };

    return new Gravity();

});