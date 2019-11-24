import firebase from "firebase"
import { showError, showSuccess } from "../../core"
import _ from "lodash"

const initialValue = {
    all: [],

    isBusy: false
}

export const teacher = {
    state: { ...initialValue }, // initial state
    reducers: {
        // handle state changes with pure functions
        setIsBusy(state, payload) {
            return {
                ...state,
                isBusy: payload
            }
        },
        setTeacherContacts(state, payload) {
            return {
                ...state,
                all: payload
            }
        },
    },
    effects: dispatch => ({
        // handle state changes with impure functions.
        // use async/await for async actions
        async getTeacherContacts(payload, rootState) {
            try {
                this.setIsBusy(true)
                const teacherSnapshots = await firebase.firestore().collection('Teachers').get();
                const teacherIds = rootState.kidProfile.teacherIDs
                const teacherContacts = teacherSnapshots.docs.map(doc => ({...doc.data(), id: doc.id})).filter(t => _.includes(teacherIds, t.id))
                this.setTeacherContacts(teacherContacts)
            } catch (e) {
                showError(e.message)
            } finally {
                this.setIsBusy(false)
            }
        },

        async updateKidProfile(payload, rootState) {
            try {
                this.setIsLogging(true)
                await firebase.firestore().collection('Kids').doc(rootState.kidProfile.id).update({
                    ...payload
                });
                showSuccess('Update successfully')
            } catch (e) {
                showError(e.message)
            } finally {
                this.setIsLogging(false)
            }
        },
    }),
}