import {
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

function MyButton(props) {
  const { onPress, value, style } = props;
  return (
    <Pressable style={style.button} onPress={onPress}>
      <Text style={style.text}>{value}</Text>
    </Pressable>
  );
}

const Styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginRight: 5,
    marginTop: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'brown',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export { MyButton, Styles };
