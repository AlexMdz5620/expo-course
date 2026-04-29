import { Platform, useWindowDimensions, View } from "react-native";
import React, { useEffect } from "react";
import { globalStyles } from "@/styles/global-styles";
import ThemeText from "@/components/ThemeText";
import CalculatorButton from "@/components/CalculatorButton";
import { Colors } from "@/constants/theme";
import { useCalculator } from "@/hooks/useCalculator";

const CalculatorApp = () => {
  const { width } = useWindowDimensions();
  const {
    formula,
    prevNumber,
    buildNumber,
    clean,
    toggleSign,
    deleteLast,
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
    calculateResult,
  } = useCalculator();

  const isLargeScreen = width > 600;

  useEffect(() => {
    if (Platform.OS !== "web") return; // Solo ejecutar en navegador

    const handleKeyDown = (e: KeyboardEvent) => {
      // Evitar que el espacio haga scroll o el '/' abra la búsqueda del navegador
      if (["/", " ", "*", "-", "+"].includes(e.key)) e.preventDefault();

      // Mapeo de teclas
      if (/[0-9]/.test(e.key)) buildNumber(e.key);
      if (e.key === ".") buildNumber(".");
      if (e.key === "Enter" || e.key === "=") calculateResult();
      if (e.key === "Backspace") deleteLast();
      if (e.key === "Escape") clean();
      if (e.key === "+") addOperation();
      if (e.key === "-") subtractOperation();
      if (e.key === "*") multiplyOperation();
      if (e.key === "/") divideOperation();
      // Opcional: +/- con la tecla "s" (de sign)
      if (e.key === "s" || e.key === "S") toggleSign();
    };

    window.addEventListener("keydown", handleKeyDown);

    // Limpieza al desmontar para evitar fugas de memoria
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    buildNumber,
    calculateResult,
    deleteLast,
    clean,
    addOperation,
    subtractOperation,
    multiplyOperation,
    divideOperation,
    toggleSign,
  ]);

  return (
    <View
      style={[
        globalStyles.calculatorContainer,
        isLargeScreen && {
          maxWidth: 400, // Ancho máximo tipo teléfono
          alignSelf: "center", // Centra la calculadora en la pantalla
          marginTop: 40, // Un poco de aire arriba en web
          borderRadius: 20, // Bordes redondeados para que parezca un gadget
          paddingBottom: 20,
          height: "auto", // Que no ocupe todo el alto si no es necesario
          // Sombra para que resalte del fondo en la web
          ...Platform.select({
            web: { boxShadow: "0px 10px 30px rgba(0,0,0,0.5)" },
          }),
        },
      ]}
    >
      {/* Resultado */}
      <View style={{ paddingHorizontal: 30, marginBottom: 20 }}>
        <ThemeText variant="h1">{formula}</ThemeText>
        {formula === prevNumber ? (
          <ThemeText variant="h2"> </ThemeText>
        ) : (
          <ThemeText variant="h2">{prevNumber}</ThemeText>
        )}
      </View>
      {/* Botónes */}
      <View style={globalStyles.row}>
        <CalculatorButton
          label="C"
          balckText
          color={Colors.lightGray}
          onPress={clean}
        />
        <CalculatorButton
          label="+/-"
          balckText
          color={Colors.lightGray}
          onPress={toggleSign}
        />
        <CalculatorButton
          label="del"
          balckText
          color={Colors.lightGray}
          onPress={deleteLast}
        />
        <CalculatorButton
          label="/"
          color={Colors.orange}
          onPress={divideOperation}
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton label="7" onPress={() => buildNumber("7")} />
        <CalculatorButton label="8" onPress={() => buildNumber("8")} />
        <CalculatorButton label="9" onPress={() => buildNumber("9")} />
        <CalculatorButton
          label="X"
          color={Colors.orange}
          onPress={multiplyOperation}
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton label="4" onPress={() => buildNumber("4")} />
        <CalculatorButton label="5" onPress={() => buildNumber("5")} />
        <CalculatorButton label="6" onPress={() => buildNumber("6")} />
        <CalculatorButton
          label="-"
          color={Colors.orange}
          onPress={subtractOperation}
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton label="1" onPress={() => buildNumber("1")} />
        <CalculatorButton label="2" onPress={() => buildNumber("2")} />
        <CalculatorButton label="3" onPress={() => buildNumber("3")} />
        <CalculatorButton
          label="+"
          color={Colors.orange}
          onPress={addOperation}
        />
      </View>

      <View style={globalStyles.row}>
        <CalculatorButton
          label="0"
          doubleSize
          onPress={() => buildNumber("0")}
        />
        <CalculatorButton label="." onPress={() => buildNumber(".")} />
        <CalculatorButton
          label="="
          color={Colors.orange}
          onPress={calculateResult}
        />
      </View>
    </View>
  );
};

export default CalculatorApp;
