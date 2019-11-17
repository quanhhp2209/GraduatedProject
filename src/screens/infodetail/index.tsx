import React from 'react';
import { StyleSheet, Text, View, FlatList, InteractionManager } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import moment from 'moment'
import { DateBar } from './components';
import { ScrollView } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import { LearnActivity, NutritionActivity, NapActivity } from '../../components';
import { connect } from 'react-redux';
import { IRootState } from '../../store';


class KidDetail extends React.PureComponent<any, any> {

  constructor(props) {
    super(props);
    const today = moment().startOf('day').toISOString()
    this.state = {
      selectedDate: today,
      activitiesByTimestamp: []
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      const today = moment().startOf('day').toISOString()
      this.setState({
        activitiesByTimestamp: this.props.activities.filter(a => a.timestamp === today)
      })
    })
  }

  onChangeDate = (selectedDate: number) => {
    this.setState({
      selectedDate,
      activitiesByTimestamp: this.props.activities.filter(a => a.timestamp === selectedDate)
    })
  }

  renderItem = ({ item }) => {
    if (item.type === 'nutrition') {
      return <View style={styles.activityContainer} key={item.id}>
        <Text style={styles.activityTitle}>Today's menu</Text>
        <NutritionActivity activity={item} />
      </View>
    }

    if (item.type === 'nap') {
      return <View style={styles.activityContainer} key={item.id}>
        <Text style={styles.activityTitle}>Today's nap</Text>
        <NapActivity activity={item} />
      </View>
    }

    if (item.type === 'learn') {
      return <View style={styles.activityContainer} key={item.id}>
        <Text style={styles.activityTitle}>Today's schedule</Text>
        <LearnActivity activity={item} />
      </View>
    }

    return <View />
  }

  render() {
    return (
      <Layout style={styles.container} level="3">
        <SafeAreaView>
          <ScrollView>
            <View style={styles.dateBarContainer}>
              <DateBar selectedDate={this.state.selectedDate} onChangeDate={this.onChangeDate} />
            </View>
            <View style={styles.contentContainer}>
              <FlatList
                data={this.state.activitiesByTimestamp}
                renderItem={this.renderItem}
                keyExtractor={i => i.id}
                ListEmptyComponent={<Text style={styles.emptyText}>There are no activites recorded</Text>} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Layout>
    );
  }
}

const mapProps = ({ activity }: IRootState) => ({
  activities: activity.all
})

export default connect(mapProps)(KidDetail)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBarContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 12
  },
  activityContainer: {
    marginTop: 24
  },
  activityTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 8,
    paddingLeft: 8
  },
  emptyText: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 16
  }
});
