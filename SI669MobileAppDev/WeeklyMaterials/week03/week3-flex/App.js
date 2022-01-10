import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function App() {
  return (
    <View style={styles.container}>
      <Text>Hello world!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


function App2() {
  return (
    <View style={styles2.container}>
      <Text style={styles2.helloLabel}>Hello World!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helloLabel: {
    fontSize: 120,
    color: 'darkgreen'
  }
});

function App3() {
  return (
    <View style={styles3.container}>
      <Text style={styles3.helloLabel}>Hello World!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles3 = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helloLabel: {
    fontSize: 120,
    color: 'darkgreen'
  }
});

function App4() {

  return (
    <View style={styles4.container}>
      <View style={styles4.view1} />
      <View style={styles4.view2} />
      <View style={styles4.view3} />
    </View>
  );
}

const styles4 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  view1: {
    flex: 1,
    backgroundColor: 'pink',
  },
  view2: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  view3: {
    flex: 4,
    backgroundColor: 'tan',
  }
});

function App5() {

  return (
    <View style={styles5.container}>
      <View style={styles5.view1} />
      <View style={styles5.view2} />
      <View style={styles5.view3} />
    </View>
  );
}
const styles5 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  view1: {
    flex: 0.2,
    backgroundColor: 'pink',
  },
  view2: {
    flex: 0.2,
    backgroundColor: 'skyblue',
  },
  view3: {
    flex: 0.2,
    backgroundColor: 'tan',
  }
});


function App6() {
  return (
    <View style={styles6.container}>
      <View style={styles6.view1} />
      <View style={styles6.view2} />
      <View style={styles6.view3} />
    </View>
  );
}

const styles6 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  view1: {
    flex: 0.2,
    width: 200,
    backgroundColor: 'pink',
  },
  view2: {
    flex: 0.2,
    width: 200,
    backgroundColor: 'skyblue',
  },
  view3: {
    flex: 0.2,
    width: 200,
    backgroundColor: 'tan',
  }
});

function App7() {
  return (
    <View style={styles7.container}>
      <View style={styles7.view1} />
      <View style={styles7.view2} />
      <View style={styles7.view3} />
    </View>
  );
}

const styles7 = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  view1: {
    flex: 0.2,
    height: 200,
    backgroundColor: 'pink',
  },
  view2: {
    flex: 0.2,
    height: 200,
    backgroundColor: 'skyblue',
  },
  view3: {
    flex: 0.2,
    height: 200,
    backgroundColor: 'tan',
  }
});

export function AppSilverAndGold() {
  return (
    <View style={stylesSG.body}>
      <View style={stylesSG.section}>
        <View style={stylesSG.boxLeft}>
          <Text>Silver Box 175x175</Text>
        </View>
        <View style={stylesSG.boxLeft}>
          <Text>Silver Box 175x175</Text>
        </View>
      </View>
      <View style={stylesSG.section}>
      <View style={stylesSG.boxRight}>
          <Text>Gold Box 125x125</Text>
        </View>
        <View style={stylesSG.boxRight}>
          <Text>Gold Box 125x125</Text>
        </View>
        <View style={stylesSG.boxRight}>
          <Text>Gold Box 125x125</Text>
        </View>
      </View>
    </View>
  );
}

const stylesSG = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  section: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: "space-evenly"
  },
  boxLeft: {
    height: 175,
    width: 175,
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxRight: {
    height: 125,
    width: 125,
    backgroundColor: 'gold',
    alignItems: 'center',
    justifyContent: 'center'

  }
});

export default AppSilverAndGold;
