import firebase from "firebase"
import { showError } from "../../core"
import { navigationService } from "../../services"
const initialValue = {
    address: '',
    email: '',
    name: '',
    phone: '',

    isLoggingIn: false
}

export const userProfile = {
    state: { ...initialValue }, // initial state
    reducers: {
        // handle state changes with pure functions
        setIsLogging(state, payload) {
            return {
                ...state,
                isLoggingIn: payload
            }
        },
        setUserProfile(state, payload) {
            return {
                ...state,
                ...payload
            }
        },
    },
    effects: dispatch => ({
        // handle state changes with impure functions.
        // use async/await for async actions
        async login(payload, rootState) {
            try {
                this.setIsLogging(true)
                const credential: firebase.auth.UserCredential = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
                const userSnapshot = await firebase.firestore().collection('Users').doc(credential.user.uid).get();
                this.setUserProfile(userSnapshot.data())
                navigationService.navigate('Dashboard')
            } catch (e) {
                showError(e.message)
            } finally {
                this.setIsLogging(false)
            }
        },
    }),
}