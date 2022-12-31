import * as React from "react";
import * as S from "../storage.js";
import { MyButton, Styles } from '../components/components.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Button,
  Pressable,
  ImageBackground
} from "react-native";
import Constants from "expo-constants";

const virtue_descriptions = S.virtueDescriptions();

function getDate() {
  var day = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear();
  return [year, month, day];
}

function round(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

const Stack = createNativeStackNavigator();

function Home() {
   return (
       <Stack.Navigator initialRouteName="Virtues">
       <Stack.Screen name="Virtues" component={VirtuesListScreen} />
       <Stack.Screen name="Virtue" component={Virtue} />
       </Stack.Navigator>
   );
}

function ScoreButtons({ item, averageScoreSetter, todaysScoreSetter }) {
  const [year, month, day] = getDate();
  const virtue = item.key;
  const onPressHandler = async (score) => {
    console.log('storing', score);
    S.storeScore(score, virtue, year, month, day);
    S.averageScore(virtue, averageScoreSetter);
    S.todaysScore(virtue, year, month, day, todaysScoreSetter);
//    todaysScoreSetter('Today here you scored your self ' + score);
  };

  return (
      <View style={{flexDirection: 'row'}}>
      <MyButton style={Styles} value={1} onPress={() => onPressHandler(1)} />
      <MyButton style={Styles} value={2} onPress={() => onPressHandler(2)} />
      <MyButton style={Styles} value={3} onPress={() => onPressHandler(3)} />
      <MyButton style={Styles} value={4} onPress={() => onPressHandler(4)} />
      <MyButton style={Styles} value={5} onPress={() => onPressHandler(5)} />
      </View>
  );
}


function Virtue({route, navigation}) {
  const [averageScore, setAverageScore] = React.useState("You haven't score yourself here yet");
  const [year, month, day] = getDate();
  const virtue = route.params.key;
  const description = route.params.description;
  const [todaysScore, setTodaysScore] = React.useState('');
  
  React.useEffect(() => {
    S.averageScore(virtue, setAverageScore);
  }, []);
  React.useEffect(() => {
    S.todaysScore(virtue, year, month, day, setTodaysScore);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text style={{"fontSize": 22}} >{virtue}</Text>
      <Text style={{marginTop: 10, fontStyle: "italic"}}>{description}</Text>
      <Text style={{marginTop: 20}}>{ "Your average score here so far is " + averageScore }</Text>
      <Text style={{marginTop: 20}}>{ todaysScore }</Text>
      <ScoreButtons item={route.params} averageScoreSetter={setAverageScore} todaysScoreSetter={setTodaysScore}/>
    </View>
  );
}

function VirtuesListScreen({navigation}) {
  console.log("listStyle");
  let listStyle = JSON.parse(JSON.stringify(Styles));
  console.log('do you believe', listStyle);
  listStyle.button.marginTop = 1;
  listStyle.button.borderRadius = 1;
  listStyle.text = Styles.text;

  console.log(listStyle, "listStyle");
  return (
    <View>
      <FlatList
        data={virtue_descriptions}
        renderItem={({item}) => <MyButton style={listStyle} onPress={() => navigation.push('Virtue', item)} value={item.key} />}
      />
    </View>
  );
}

export { Home };
