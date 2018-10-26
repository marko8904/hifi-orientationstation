(function() {
    var APP_NAME = "Antigrav";
    var APP_QML = Script.resolvePath("AltGrav.qml");
    var APP_ICON = Script.resolvePath("3D-compass.svg");
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    var requiredProperties = ['x','y','z'];
    var button = tablet.addButton({
        text: APP_NAME,
        icon: APP_ICON
    });

    function onClicked() {
        tablet.loadQMLSource(APP_QML);
    }
    function orientateMe(rotation) {
        MyAvatar.orientation =
            Quat.multiply(
                MyAvatar.orientation,
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