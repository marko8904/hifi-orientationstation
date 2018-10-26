(function() {
    var APP_NAME = "Antigrav";
    var APP_QML = Script.resolvePath("AltGrav.qml");
    var APP_ICON = Script.resolvePath("3d-compass.svg");
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    var requiredProperties = ['x','y','z'];
    var button = tablet.addButton({
        text: APP_NAME,
        icon: APP_ICON
    });

    function onClicked() {
        tablet.loadQMLSource(APP_QML);
    }

    function snapToCardinalDirection(value) {
        return Math.round(value/90.0)*90;
    }

    function orientateMe(rotation) {
        var correctedOrientation = Quat.safeEulerAngles(MyAvatar.orientation);
        
        correctedOrientation = {
            x: snapToCardinalDirection(correctedOrientation.x),
            y: correctedOrientation.y,
            z: snapToCardinalDirection(correctedOrientation.z),
        };

        MyAvatar.orientation =
            Quat.multiply(
                Quat.fromVec3Degrees(
                    correctedOrientation
                ),
                Quat.fromVec3Degrees(
                    rotation
                )
            );
    }

    function reset() {
        MyAvatar.orientation =
            Quat.fromVec3Degrees({
                x: 0,
                y: Quat.safeEulerAngles(MyAvatar.orientation).y,
                z: 0
            })
    }

    function onWebEventReceived(event) {
        print("antigravApp.js recieved a QML event: " + JSON.stringify(event));
        
            if (event.hasOwnProperty("reset") && event.reset){
                reset();
            }
            else if (event.hasOwnProperty("rotation")) {

                orientateMe(event.rotation);
            }
    }

    function cleanup() {
        tablet.removeButton(button);
        reset();
    }

    button.clicked.connect(onClicked);
    tablet.fromQml.connect(onWebEventReceived);
    Script.scriptEnding.connect(cleanup);
}());