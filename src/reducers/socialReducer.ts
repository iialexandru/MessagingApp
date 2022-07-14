const INITIAL_VALUES = {
    loading: false,
    psLoading: false,
    friends: [],
    peopleSearch: [],
    friendRequests: []
}


export enum SOCIAL_ACTIONS {
    DEFAULT_STATE = 'DEFAULT_STATE',
    START_LOADING = 'START_LOADING',
    STOP_LOADING = 'STOP_LOADING',
    UPDATE_FRIENDS = 'UPDATE_FRIENDS',
    SHOW_PEOPLE_SEARCH = 'SHOW_PEOPLE_SEARCH',
    RESET_PEOPLE_SEARCH = 'RESET_PEOPLE_SEARCH',
    PEOPLE_SEARCH_START_LOADING = 'PEOPLE_SEARCH_START_LOADING',
    PEOPLE_SEARCH_STOP_LOADING = 'PEOPLE_SEARCH_STOP_LOADING',
    GET_FRIEND_REQUESTS = 'GET_FRIEND_REQUESTS',
    FRIENDS = 'FRIENDS',
    REMOVE_FRIEND = 'REMOVE_FRIEND',
    BLOCK_SITUATION = 'BLOCK_SITUATION',
    DELETE_DATA = 'DELETE_DATA',
}


const reducer: any = (state = INITIAL_VALUES, action: any) => {
    switch(action.type) {
        case SOCIAL_ACTIONS.DEFAULT_STATE: {
            return {
                ...state,
                psLoading: false,
                loading: false, 
                peopleSearch: []
            }
        }
        case SOCIAL_ACTIONS.DELETE_DATA: {
            return {
                ...state,
                psLoading: false,
                loading: false, 
                peopleSearch: [],
                friends: [],
                friendRequests: []
            }
        }
        case SOCIAL_ACTIONS.FRIENDS: {
            return {
                ...state,
                friends: [ ...action.payload.friends ]
            }
        }
        case SOCIAL_ACTIONS.START_LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        case SOCIAL_ACTIONS.STOP_LOADING: {
            return {
                ...state,
                loading: false
            }
        }
        case SOCIAL_ACTIONS.PEOPLE_SEARCH_START_LOADING: {
            return {
                ...state,
                psLoading: true
            }
        }
        case SOCIAL_ACTIONS.PEOPLE_SEARCH_STOP_LOADING: {
            return {
                ...state,
                psLoading: false
            }
        }
        case SOCIAL_ACTIONS.UPDATE_FRIENDS: {
            return {
                ...state,
                friends: action.payload.friend
            }
        }
        case SOCIAL_ACTIONS.SHOW_PEOPLE_SEARCH: {
            return {
                ...state,
                peopleSearch: [ ...action.payload.people ]
            }
        }
        case SOCIAL_ACTIONS.GET_FRIEND_REQUESTS: {
            return {
                ...state,
                friendRequests: [ ...action.payload.friendRequests ]
            }
        }
        case SOCIAL_ACTIONS.RESET_PEOPLE_SEARCH: {
            return {
                ...state,
                peopleSearch: []
            }
        }
        case SOCIAL_ACTIONS.REMOVE_FRIEND: {
            const newFriends = state.friends.filter((fr: any) => fr.email !== action.payload.email)

            return {
                ...state,
                friends: newFriends
            }
        }
        case SOCIAL_ACTIONS.BLOCK_SITUATION: {
            let newFriends: any = state.friends

            newFriends = newFriends.map((fr: any) => {
                if(action.payload.friendId === fr.friendId) {
                    const block = fr.blocked
                    fr.blocked = !block
                }

                return fr
            })

            return {
                ...state,
                friends: newFriends
            }
        }
        default: {
            return state
        }
    }
}


export default reducer;