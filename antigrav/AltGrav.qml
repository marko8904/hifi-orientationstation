import QtQuick 2.0
import QtQuick.Controls 2.2

Rectangle {
    id: root

    anchors.fill: parent

    color: "blue"
    signal sendToScript(var message);


    Text {
        id: header
        anchors {
            horizontalCenter: root.horizontalCenter
            top: root.top
            topMargin: 10
        }

        color: "white"
        text: "AntiGrav"
        font.pixelSize: 30
    }

    Button {
        id: toggleAntiGrav

        anchors.left: parent.left
        anchors.top: parent.top
        anchors.leftMargin: 40
        anchors.topMargin: 70
        text: "Reset"
        onClicked: {
            var message = {
                reset: true
            };

            root.sendToScript(message);
        }
    }


    Text {
        id: tilt

        anchors {
            horizontalCenter: toggleAntiGrav.horizontalCenter
            top: toggleAntiGrav.top
            topMargin: 70
        }

        font.pixelSize: 20
        text: "Tilt Avatar"
        color: "white"
    }

    Button {
        id: front

        anchors {
            horizontalCenter: tilt.horizontalCenter
            top: tilt.bottom
            topMargin: 10
        }

        font.pixelSize: 16
        text: "Font"

         onClicked: {
             var message = {
                 rotation: {
                     x: 90,
                     y: 0,
                     z: 0
                 }
            };

            root.sendToScript(message);
        }
    }

    Button {
        id: back

        anchors {
            horizontalCenter: front.horizontalCenter
            top: front.bottom
            topMargin: 30
        }

        font.pixelSize: 16
        text: "Back"

         onClicked: {
             var message = {
                 rotation: {
                     x: -90,
                     y: 0,
                     z: 0
                 }
             };

            root.sendToScript(message);
        }
    }


    Button {
        id: left

        anchors {
            horizontalCenter: back.horizontalCenter
            top: back.bottom
            topMargin: 30
        }

        font.pixelSize: 16
        text: "Left"

         onClicked: {
             var message = {
                 rotation: {
                     x: 0,
                     y: 0,
                     z: 90
                 }
            };

            root.sendToScript(message);
        }
    }

    Button {
        id: right

        anchors {
            horizontalCenter: left.horizontalCenter
            top: left.bottom
            topMargin: 30
        }

        font.pixelSize: 16
        text: "Right"

         onClicked: {
            var message = {
                x: 0,
                y: 0,
                z: -90
            };

            root.sendToScript(message);
        }
    }

    Button {

        id: flip

        anchors {
            horizontalCenter: right.horizontalCenter
            top: right.bottom
            topMargin: 30
        }

        font.pixelSize: 16
        text: "Flip"

         onClicked: {
            var message = {
                x: 180,
                y: 0,
                z: 0
            };

            root.sendToScript(message);
        }
    }
}
