import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner'

export default function App() {
  const [hasPermission, setPermission] = useState(false)
  const [scanned, setScanned] = useState(true)

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermission(status === "granted")
    }

    getPermission()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    alert(`Código de barras com tipo ${type} e dados ${data} foi escaneado!`)
  }

  if (!hasPermission) {
    return <Text> Sem acesso à camera.</Text>
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner style={StyleSheet.absoluteFillObject} onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} />
      <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Escanear Código de Barras" onPress={() => setScanned(false)} />
      </View>
    </View>
  );
}

