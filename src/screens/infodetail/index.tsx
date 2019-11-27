import React from 'react';
import { StyleSheet, Text, View, FlatList, InteractionManager } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import moment from 'moment'
import { DateBar } from './components';
import { ScrollView } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import { LearnActivity, NutritionActivity, NapActivity, Wrapper } from '../../components';
import { connect } from 'react-redux';
import { IRootState } from '../../store';
import firebase from 'firebase';


class KidDetail extends React.PureComponent<any, any> {

  static navigationOptions = {
    title: 'Kid Activities',
  };

  constructor(props) {
    super(props);
    const today = moment().startOf('day').toISOString()
    this.state = {
      selectedDate: today,
      activitiesByTimestamp: [],
      isBusy: true
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(async () => {
      const today = moment().startOf('day').toISOString()
      const absenceRequestSnapshot = await firebase.firestore().collection('AbsenceRequests').where('timestamp', '==', today).where('kidID', '==', this.props.kidProfile.id).get()
      this.setState({
        activitiesByTimestamp: absenceRequestSnapshot.empty ? this.props.activities.filter(a => a.timestamp === today) : [],
        isBusy: false,
        isAbsent: !absenceRequestSnapshot.empty,
      })
    })
  }

  onChangeDate = async (selectedDate: number) => {
    this.setState({
      selectedDate,
      isBusy: true
    })
    const absenceRequestSnapshot = await firebase.firestore().collection('AbsenceRequests').where('timestamp', '==', selectedDate).where('kidID', '==', this.props.kidProfile.id).get()
    this.setState({
      activitiesByTimestamp: absenceRequestSnapshot.empty ? this.props.activities.filter(a => a.timestamp === selectedDate) : [],
      isAbsent: !absenceRequestSnapshot.empty,
      isBusy: false
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
      <Wrapper isLoading={this.state.isBusy} containerStyle={styles.container}>
        <View style={styles.dateBarContainer}>
          <DateBar selectedDate={this.state.selectedDate} onChangeDate={this.onChangeDate} />
        </View>
        <View style={styles.contentContainer}>
          <FlatList
            data={this.state.activitiesByTimestamp}
            renderItem={this.renderItem}
            keyExtractor={i => i.id}
            ListEmptyComponent={<Text style={styles.emptyText}>{this.state.isAbsent ? 'Today is the absent day' : 'There are no activites recorded'}</Text>} />
        </View>
      </Wrapper>

    );
  }
}

const mapProps = ({ activity, kidProfile }: IRootState) => ({
  activities: activity.all,
  kidProfile
})

export default connect(mapProps)(KidDetail)


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0
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
