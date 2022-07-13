import axios from 'axios'

import { SOCIAL_ACTIONS } from '../reducers/socialReducer'
import { server } from '../config/index'


export const deleteSocialData = () => (dispatch: any) => {
    dispatch({ 
        type: SOCIAL_ACTIONS.DELETE_DATA
    })
}

export const updateFriends = () => async (dispatch: any) => {

    dispatch({
        type: SOCIAL_ACTIONS.START_LOADING
    })

    try {
        const result = (await axios.get(`${server}/api/social/show-friends`, { withCredentials: true })).data
        
        dispatch({
            type: SOCIAL_ACTIONS.FRIENDS,
            payload: { friends: result.friends }
        })
    } catch (err) {
        console.log(err)
    }

    dispatch({
        type: SOCIAL_ACTIONS.STOP_LOADING
    })
}


export const defaultState = () => async (dispatch: any) => {
    dispatch({
        type: SOCIAL_ACTIONS.DEFAULT_STATE
    })
}


export const addFriend = ({ email, onSuccess  }: { email: string, onSuccess: () => void }) => async (dispatch: any) => {
    try {
        (await axios.post(`${server}/api/social/add-friend`, { email }, { withCredentials: true }))

        onSuccess()
        updateFriends()
    } catch (err) {
        console.log(err)
    }
}

export const removeFriend = ({ email, onSuccess, remFrCallback, onRemoveFriend }: { onRemoveFriend: any, email: string, onSuccess: () => void, remFrCallback: ({ conversationId }: { conversationId: string }) => void }) => async (dispatch: any) => {
    try {
        const result = (await axios.post(`${server}/api/social/remove-friend`, { email }, { withCredentials: true })).data

        dispatch({
            type: SOCIAL_ACTIONS.REMOVE_FRIEND,
            payload: { email }
        })

        onSuccess()
        
        onRemoveFriend({ conversationId: result.conversationId })

        remFrCallback({ conversationId: result.conversationId })
    } catch (err) {
        console.log(err)
    }
}

export const showFriendRequests = () => async (dispatch: any) => {
    dispatch({
        type: SOCIAL_ACTIONS.START_LOADING
    })

    try {
        const result = (await axios.get(`${server}/api/social/show-friend-requests`, { withCredentials: true })).data

        dispatch({
            type: SOCIAL_ACTIONS.GET_FRIEND_REQUESTS,
            payload: { friendRequests: result.friendRequests }
        })
    } catch (err) {
        console.log(err)
    }

    dispatch({
        type: SOCIAL_ACTIONS.STOP_LOADING
    })
}

export const acceptFriendRequest = ({ email, onSuccess, acceptedRequestCallback }: { email: string, onSuccess: () => void, acceptedRequestCallback: any }) => async (dispatch: any) => {
    try {
        const result = (await axios.post(`${server}/api/social/accept-request`, { email }, { withCredentials: true })).data

        onSuccess()
        updateFriends()

        acceptedRequestCallback({ conversation: result.conversation })
    } catch (err) {
        console.log(err)
    }
}

export const rejectFriendRequest = ({ email, onSuccess }: { email: string, onSuccess: () => void }) => async (dispatch: any) => {
    try {
        (await axios.post(`${server}/api/social/reject-request`, { email }, { withCredentials: true }))

        onSuccess()
    } catch (err) {
        console.log(err)
    }
} 

export const showPeopleSearch = ({ email }: { email: string }) => async (dispatch: any) => {
    dispatch({
        type: SOCIAL_ACTIONS.PEOPLE_SEARCH_START_LOADING
    })

    try {
        const result = (await axios.post(`${server}/api/social/show-people`, { email } ,{ withCredentials: true })).data

        dispatch({
            type: SOCIAL_ACTIONS.PEOPLE_SEARCH_STOP_LOADING
        })

        dispatch({
            type: SOCIAL_ACTIONS.SHOW_PEOPLE_SEARCH,
            payload: { people: result.value }
        })

    } catch (err) {
        console.log(err)
    }

    dispatch({
        type: SOCIAL_ACTIONS.PEOPLE_SEARCH_STOP_LOADING
    })
}


export const resetPeopleSearch = () => (dispatch: any) => {
    dispatch({
        type: SOCIAL_ACTIONS.RESET_PEOPLE_SEARCH
    })
}


export const blockFriend = ({ email, onSuccess }: { email: string, onSuccess: () => void }) => async (dispatch: any) => {
    try {
        await axios.post(`${server}/api/social/block-friend`, { email }, { withCredentials: true })

        onSuccess()
    } catch (err) {
        console.log(err)
    }
}


export const unblockFriend = ({ email, onSuccess }: { email: string, onSuccess: () => void }) => async (dispatch: any) => {
    try {
        await axios.post(`${server}/api/social/unblock-friend`, { email }, { withCredentials: true })

        onSuccess()
    } catch (err) {
        console.log(err)
    }
}
