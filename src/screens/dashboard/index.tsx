import React from 'react';
import { StyleSheet, Text, View, SectionList, SafeAreaView } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import { IRootState } from '../../store';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import _ from 'lodash';
import { NutritionActivity, NapActivity, LearnActivity, Wrapper, LoadingOverlay } from '../../components';
import moment from 'moment';


class Dashboard extends React.PureComponent<any> {

  renderItem = ({ item }) => {
    if (item.type === 'nutrition') {
      return <View style={styles.activityContainer} key={item.id}>
        <NutritionActivity activity={item} />
      </View>
    }

    if (item.type === 'nap') {
      return <View style={styles.activityContainer} key={item.id}>
        <NapActivity activity={item} />
      </View>
    }

    if (item.type === 'learn') {
      return <View style={styles.activityContainer} key={item.id}>
        <LearnActivity activity={item} />
      </View>
    }

    return <View />
  }

  renderHeader = ({ section }) => {
    return <View style={styles.headerContainer}>
      <Text style={styles.header}>{moment(section.title).format('dddd, DD/MM/YYYY')}</Text>
    </View>
  }

  render() {
    return (
      <Wrapper isLoading={this.props.isFetchingActivity}>
        <SectionList
          sections={this.props.activitiesGroupByDate}
          keyExtractor={(item, index) => item + index}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderHeader}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        />
      </Wrapper>
    );
  }
}

const getAllActivities = state => state.activity.all
const getActiviesGroupByDate = createSelector(
  [getAllActivities],
  (activites) => {
    const activitesGroupByDate = _.groupBy(activites, 'timestamp')
    return Object.entries(activitesGroupByDate).map(([timestamp, data]) => ({ title: timestamp, data }))
  }
)

const mapProps = (state: IRootState) => ({
  activitiesGroupByDate: getActiviesGroupByDate(state),
  isFetchingActivity: state.activity.isBusy
})

export default connect(mapProps)(Dashboard)


const styles = StyleSheet.create({
  activityContainer: {
    marginTop: 16,
    
  },
  headerContainer: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#57CAFF',
    paddingVertical: 24
  },
  header: {
    fontWeight: '900',
    fontSize: 15,
    color: '#fff',
    textAlign: 'center'
  },
  contentContainer: {
    paddingVertical: 12,
  }
});
