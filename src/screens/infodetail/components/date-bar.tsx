import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import moment from 'moment'
import { TouchableOpacity } from 'react-native-gesture-handler';

export class DateBar extends React.PureComponent<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            dateRange: []
        }
    }

    componentDidMount() {
        const dateRange = [];
        const startDate = moment().subtract(15, 'd').startOf('day').toISOString()
        for (let i = 1; i < 30; i++) {
            dateRange.push(moment(startDate).add(i, 'd').toISOString())
        }
        this.setState({
            dateRange
        })
    }

    renderDateItem = ({ item }: { item: number }) => {
        const { selectedDate } = this.props
        const isActive = selectedDate === item
        const onChangeDate = () => {
            this.props.onChangeDate(item)
        }
        const today = moment().startOf('day').toISOString()
        return (
            <TouchableOpacity style={isActive ? styles.dateItemActive : styles.dateItem} key={item.toString()} onPress={onChangeDate}>
                {moment(item).diff(today) === 0
                    ? <Text style={styles.date}>Today</Text>
                    : <React.Fragment>
                        <Text style={styles.date}>{moment(item).format('ddd')}</Text>
                        <Text style={styles.date}>{moment(item).format('DD/MM')}</Text>
                    </React.Fragment>
                }

            </TouchableOpacity>
        )
    }

    render() {
        return (
            <FlatList
                horizontal
                data={this.state.dateRange}
                renderItem={this.renderDateItem}
                keyExtractor={item => item.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 12 }}
                // decelerationRate="fast"
                // snapToInterval={sideWidth * 7} //your element width
                // snapToAlignment={"center"}
                // pagingEnabled
            />
        );
    }
}


const sideWidth = (Dimensions.get('window').width / 7) - 6

const styles = StyleSheet.create({
    dateItem: {
        backgroundColor: '#A3BDFF',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
        height: sideWidth,
        width: sideWidth
    },
    dateItemActive: {
        backgroundColor: '#5686FF',
        height: sideWidth,
        width: sideWidth,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4
    },
    date: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '500'
    }
});
