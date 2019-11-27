import Toast from 'react-native-root-toast';

export const showError = (e: string) => {
    Toast.show(e, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: 'red'
    });
}

export const showSuccess = (e: string) => {
    Toast.show(e, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: 'green'
    });
}