import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeColor } from "../hooks/use-theme-color";

interface Props {
  options: string[];
  selectedOptions: string[];

  onSelect: (option: string) => void;
}

const ThemedButtonGroup = ({ options, selectedOptions, onSelect }: Props) => {
  const primaryColor = useThemeColor({}, "primary");
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          onPress={() => onSelect(option)}
          key={option}
          style={[
            styles.btn,
            selectedOptions.includes(option) && {
              backgroundColor: primaryColor,
            },
          ]}
        >
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={[
              styles.btnText,
              selectedOptions.includes(option) && styles.selectedBtnText,
            ]}
          >
            {option[0].toUpperCase() + option.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ThemedButtonGroup;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  btn: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  btnText: {
    fontSize: 16,
  },
  selectedBtnText: {
    color: "#fff",
  },
});
