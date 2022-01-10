import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getISchools } from './iSchoolData';
import { shuffleArray } from './Shuffle';

function orderUM(school) {
  let newOrder = [],
    ret = [];
  for (let s of school) {
    if (s.univ == 'University of Michigan') newOrder.unshift(s);
    else newOrder.push(s);
  }
  for (let r = 0; r < newOrder.length; r++) newOrder[r].rank = r + 1;
  for (let i in newOrder.slice(0, 36))
    ret.push({
      key: i,
      school: newOrder[i],
    });
  return ret;
}

class School extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.school}>
        <View style={styles.schoolRankConatiner}>
          <Text style={styles.schoolRank}>{this.props.rank}</Text>
        </View>
        <View style={styles.schoolInfo}>
          <Text style={styles.universityName} numberOfLines={1} ellipsizeMode={"tail"}>{this.props.univ}</Text>
          <Text style={styles.schoolName} numberOfLines={1} ellipsizeMode={"tail"}>{this.props.school}</Text>
        </View>
      </View>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      updateTime: new Date().toLocaleString(),
      iSchoolData: orderUM(getISchools()),
    };
  }

  onUpdate = () => {
    this.setState({
      updateTime: new Date().toLocaleString(),
      iSchoolData: orderUM(shuffleArray(getISchools())),
    });
  };
  //
  // 

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View>
            <Text style={styles.titleText}>iSchool Rankings</Text>
            <Text style={styles.timeText}>
              Updated: {this.state.updateTime}
            </Text>
          </View>
          <View style={styles.iconConatiner}>
            <TouchableOpacity onPress={this.onUpdate}>
              <Ionicons name="ios-refresh" size={35} color="blue" width="16" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            data={this.state.iSchoolData}
            renderItem={({item}) => (
              <School rank={item.school.rank} univ={item.school.univ} school={item.school.school} />
            )}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  topContainer: {
    flex: 0.11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#123463',
    alignItems: 'flex-top',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '20%',
  },
  iconConatiner: {
    height: '70%',
    width: '21%',
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 10,
    backgroundColor: '#699fb3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 27,
  },
  timeText: {
    color: 'white',
    fontSize: 12,
  },
  bottomContainer: {
    flex: 1,
    padding: '1%',
  },
  school: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    padding: '1.5%',
  },
  schoolInfo: {
    alignContent: 'flex-start',
    flex: 0.95
  },
  schoolRankConatiner:{
    alignItems: "center",
    width: 40
  },
  schoolRank: {
    fontSize: 25,
    fontWeight: 20,
    color: 'purple',
  },
  universityName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#123463',
  },
  schoolName: {
    fontSize: 11,
  },
});
