import firebase from "firebase"
import { showError } from "../../core"
import { navigationService } from "../../services"
const initialValue = {
    fullname: '',
    nickname: '',
    dob: '',
    studentId: '',
    gender: '',
    class: '',
    school: '',

    isBusy: false
}

export const kidProfile = {
    state: { ...initialValue }, // initial state
    reducers: {
        // handle state changes with pure functions
        setIsBusy(state, payload) {
            return {
                ...state,
                isBusy: payload
            }
        },
        setKidProfile(state, payload) {
            return {
                ...state,
                ...payload
            }
        },
    },
    effects: dispatch => ({
        // handle state changes with impure functions.
        // use async/await for async actions
        async getKidInfo(payload, rootState) {
            try {
                this.setIsBusy(true)
                const kidSnapshot = await firebase.firestore().collection('Kids').doc(rootState.userProfile.kidID).get();
                this.setKidProfile(kidSnapshot.data())
            } catch (e) {
                showError(e.message)
            } finally {
                this.setIsBusy(false)
            }
        },
    }),
}