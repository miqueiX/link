import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class Transaction extends Component {
  constructor() {
    super();
    this.state = {
      state: "normal",
      hasPermissions: null,
      scanned: false,
      scannedData: "",
    };
  }

  getPermissions = async (state) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasPermissions: status === "granted",
      scanned: false,
      state: state,
    });
  };

  codeScanned = async ({ type, data }) => {
    this.setState({
      state: "normal",
      scanned: true,
      scannedData: data,
    });
  };

  render() {
    const { state, hasPermissions, scanned, scannedData } = this.state;
    if (state === "scanner") {
      return (
        <BarCodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={scanned ? undefined : this.codeScanned}
        />
      );
    }
    return (
      <View>
        <TouchableOpacity
          onPress={() => (this.getPermissions = "scanner")}
          style={{
            width: "43%",
            height: 55,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F48D20",
            borderRadius: 15,
          }}
        >
          <Text>Scanear</Text>
        </TouchableOpacity>
        <Text>
          {hasPermissions ? scannedData : "Aceite a permissão da câmera"}
        </Text>
      </View>
    );
  }
}
