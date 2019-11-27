import firebase from "firebase"
import { showError, showSuccess } from "../../core"
import _ from "lodash"

const initialValue = {
    all: [],

    isBusy: false
}

export const absenceRequests = {
    state: { ...initialValue }, // initial state
    reducers: {
        // handle state changes with pure functions
        setIsBusy(state, payload) {
            return {
                ...state,
                isBusy: payload
            }
        },
        setAbsenceRequests(state, payload) {
            return {
                ...state,
                all: payload
            }
        },
    },
    effects: dispatch => ({
        // handle state changes with impure functions.
        // use async/await for async actions
        async getAbsenceRequests(payload, rootState) {
            try {
                this.setIsBusy(true)
                const kidID = rootState.userProfile.kidID
                const absenceRequestSnapshots = await firebase.firestore().collection('AbsenceRequests').where('kidID', '==', kidID).get();
                const absenceRequests = absenceRequestSnapshots.docs.map(doc => ({...doc.data(), id: doc.id}))
                this.setAbsenceRequests(absenceRequests)
            } catch (e) {
                showError(e.message)
            } finally {
                this.setIsBusy(false)
            }
        },
    }),
}