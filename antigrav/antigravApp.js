(function() {
    var APP_NAME = "Antigrav";
    var APP_QML = Script.resolvePath("AltGrav.qml");
    var APP_ICON = Script.resolvePath("3D-compass.svg");
    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    var button = tablet.addButton({
        text: APP_NAME,
        icon: APP_ICON
    });

    function onClicked() {
        tablet.loadQMLSource(APP_QML);
    }
    function orientateMe(rotate_deg_x, rotate_deg_y, rotate_deg_z) {
        MyAvatar.orientation =
            Quat.multiply(
                MyAvatar.orientation,
                Quat.fromVec3Degrees({
                    x: rotate_deg_x,
                    y: rotate_deg_y,
                    z: rotate_deg_z}
                )
            );
    }

    function reset() {
        MyAvatar.orientation =
            Quat.fromVec3Degrees({
                x: 0,
                y: MyAvatar.orientation.safeEulerAngles(0).y,
                z: 0
            })
    }

    function onWebEventReceived(event) {
        print("antigravApp.js recieved a web event: " + event);
        
        if (typeof event === "string") {
            event = JSON.parse(event);

            if (event.hasOwnProperty("reset") && event.reset){
                reset();
            }
            else {
                (event.hasOwnProperty("rotation")) {
                let requiredProperties = ['x','y','z'];

                if (requiredProperties.every(function(x) { return x in rotation; })) {
                    orientateMe(rotation.x, rotation.y, rotation.z);
                }
            }
        }
    }

    function cleanup() {
        tablet.removeButton(button);
        reset();
    }

    button.clicked.connect(onClicked);
    tablet.fromQML.connect(onWebEventReceived);
    Script.scriptEnding.connect(cleanup);
}());