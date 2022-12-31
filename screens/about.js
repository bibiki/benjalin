import { MyButton, Styles } from '../components/components.js';
import { Text,  View, Pressable, Linking } from "react-native";

const linkStyle = JSON.parse(JSON.stringify(Styles));
linkStyle.button.paddingVertical = 2;
linkStyle.button.paddingHorizontal = 24;

function About() {
  return (
    <View >
      <Text>{
        "This app is inspired by Benjmin Franklin\'s biography. In his autobiography, chapter nine is titled 'Plan for Attaining Moral Perfection'. His plan consists of keeping track of his performance in thirteen virtues and improving in them. For more on how he did that, you may check chapter 9, in the book linked to below."}
      </Text>
      <Text>{"This here is an app to allow interested people to follow his plan."}</Text>
      <Text>
      {"As far as this application goes, it\'ll always be available on a 'pay as much as you want' basis. That includes it being available for free."}
    </Text>
      <Text>
      {"You may also fork the code of this application and modify it as you wish with no strings attached."}
    </Text>
      <Text>
      {"The book is also freely available on "}
    </Text>
      <View style={{flexDirection: 'row'}}><MyButton style={linkStyle} value='Gutenberg' onPress={() => Linking.openURL('https://gutenberg.org/ebooks/20203')} /></View>
      <Text>{'The tldr of mister Franklin\'s plan was to focus on keeping track of his own performance on one of the virtues he identified and record each time he failed in them. He would focus on one virtue for a whole week, and then move to another of his choice. The app is currently organized differently. A user can chose any of the values, any day, to score themseles in. The view for a particular virtue will show the daily score, and the overall average score for the user.'}</Text>
    </View>
  );
}

export { About };
