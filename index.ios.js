import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Button, ActivityIndicator, StyleSheet, AppRegistry, FlatList} from 'react-native';
import { StackNavigator } from 'react-navigation'
import NewHabitContainer from './app/containers/NewHabitContainer'
import HabitShow from './app/containers/HabitShow'
import General, { Home, ButtonStyles } from './app/containers/ContainerStyles';
//import DeviceInfo from 'react-native-device-info';

var userIdentifier = '12345'

export default class HomeScreen extends Component {
  static navigationOptions = {
    // title: 'Test'
    header: null,
    // mode: 'modal',

  }
  constructor() {
    super();
    console.disableYellowBox = true;
    this.state = {
      //device_id: DeviceInfo.getUniqueID(),
      isLoading: true,
      habits: []
    };
  }

  componentWillMount() {
    console.log(this.state.device_id)
    return fetch('https://habitualdb.herokuapp.com/users/' + userIdentifier + '/habits')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          habits: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    // console.log(navigate)
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={Home.container}>
        <View style={Home.viewTitle}>
          <Text style={Home.appTitle}>Habitual</Text>
        </View>

        <View style={ ButtonStyles.container }>
          <TouchableOpacity onPress={() => navigate('NewHab')}>
            <View style={ [ButtonStyles.button, ButtonStyles.addButton ] }>
              <Text style={ ButtonStyles.text }>Add a Habit</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={Home.viewList}>
          <View style={Home.habitContainer}>
            <Text style={Home.habitsLabel}>Current Habits</Text>
            <FlatList
              style={Home.flatList}
              data={this.state.habits}
              renderItem={({item}) =>
                <View style={ ButtonStyles.container }>
                  <TouchableOpacity
                    onPress={()=> navigate('HabitShow', {id: item.id, name: item.name})}
                    style={ [ ButtonStyles.button, ButtonStyles.habitButton ] }>
                    <Text style={ ButtonStyles.text }>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        </View>
      </View>
    );
  }
}

const SimpleApp = StackNavigator({
  Home: {screen: HomeScreen},
  //these you declare, name, view
  NewHab: {screen: NewHabitContainer},
  HabitShow: {screen: HabitShow}
});

AppRegistry.registerComponent('HabitualFrontEndRN', () => SimpleApp);

          // renderItem={({item}) => <Button onPress={() => navigate('HabitShow')} title={item.name} style={styles.habit} />}
