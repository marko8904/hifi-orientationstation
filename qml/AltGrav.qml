import QtQuick 2.0
import QtQuick.Controls 2.2

Rectangle {
    id: root

    anchors.fill: parent

    color: "blue"
    signal sendToScript(var message);

    CheckBox {
        id: toggleOrientationStation

        anchors.left: parent.left
        anchors.top: parent.top
        anchors.leftMargin: 40
        anchors.topMargin: 10
        onClicked: {
            var message = {
                enable: toggleOrientationStation.checked
            };

            root.sendToScript(message);
        }
    }

    Text {
        id: toggleText
        anchors {
            verticalCenter: toggleOrientationStation.verticalCenter
            left: toggleOrientationStation.right
            leftMargin: 10
        }
        text: "Turn on"
        color: "white"
    }


    Text {
        id: axis

        anchors {
            horizontalCenter: toggleOrientationStation.horizontalCenter
            top: toggleOrientationStation.top
            topMargin: 50
        }

        font.pixelSize: 16
        text: "Tilt Avatar"
        color: "white"
    }
}
