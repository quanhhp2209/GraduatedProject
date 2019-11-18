import firebase from "firebase"
import { showError } from "../../core"
import { navigationService } from "../../services"
const initialValue = {
    all: [],
    isBusy: false
}

export const activity = {
    state: { ...initialValue }, // initial state
    reducers: {
        // handle state changes with pure functions
        setIsBusy(state, payload) {
            return {
                ...state,
                isBusy: payload
            }
        },
        setActivities(state, payload) {
            return {
                ...state,
                all: payload
            }
        },
    },
    effects: dispatch => ({
        async getActivites(payload, rootState) {
            try {
                this.setIsBusy(true)
                const kidID = rootState.userProfile.kidID
                const [learnSnapshot, napSnapshot, nutritionSnapshot] = await Promise.all([
                    firebase.firestore().collection('LearnActivities').where('kidID', '==', kidID).get(),
                    firebase.firestore().collection('NapActivities').where('kidID', '==', kidID).get(),
                    firebase.firestore().collection('NutritionMenus').where('kidID', '==', kidID).get()
                ])
                const learnActivities = learnSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, type: 'learn' }))
                const napActivities = napSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, type: 'nap' }))
                const nutritionActivities = nutritionSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, type: 'nutrition' }))
                const activites = [...learnActivities, ...napActivities, ...nutritionActivities]

                this.setActivities(activites)
            } catch (e) {
                showError(e.message)
            } finally {
                this.setIsBusy(false)
            }
        },
    }),
}