// import type { Dispatch, SetStateAction } from 'react'
// import { useState, useEffect } from 'react'
// import axios from 'axios'

// import { TextMessage } from '@typings'
// import { server } from '../config/index'


// interface useConversationProps {
//     socket: any;
//     scrollRef: any;
//     scrollContainerRef: any;
//     newContainer: boolean;
//     setNewContainer: Dispatch<SetStateAction<boolean>>;
//     conversationId: string;
//     myEmail: string;
//     inView: boolean;
//     renderFirstTime: boolean;
//     setRenderFirstTime: Dispatch<SetStateAction<boolean>>
//     messages: any;
//     setMessages: Dispatch<SetStateAction<any>>;
// }


// const useConversation = ({ messages, setMessages, socket, scrollRef, scrollContainerRef, newContainer, setNewContainer, conversationId, myEmail, inView, renderFirstTime, setRenderFirstTime}: useConversationProps) => {
//     const [ peopleIds, setPeopleIds ] = useState<any>([])
//     const [ total, setTotal ] = useState(0)

//     const [ activate, setActivate ] = useState(false)
//     const [ skip, setSkip ] = useState(0)

//     const [ loading, setLoading ] = useState(false)
//     const [ initialLoading, setInitialLoading ] = useState(false)




//     useEffect(() => {
//         const getConversation = async () => {
//             setTimeout(() => {
//                 scrollRef.current?.scrollIntoView()
//             }, 0)

//             setSkip(0)
//             setInitialLoading(true)
//             const result = (await axios.get(`${server}/api/conversation/show-conversation/${conversationId}?limit=${30}&skip=${0}`, { withCredentials: true })).data

//             setMessages(result.messages.reverse())
//             setPeopleIds(result.people.reverse())
//             setTotal(result.total)

//             setInitialLoading(false)
//             setNewContainer(false)

//             setTimeout(() => {
//                 scrollRef.current?.scrollIntoView()
//             }, 0)
//         }

//         if(newContainer) {
//             getConversation()
//         }
        
//         setLoading(false)
//     }, [ conversationId, skip, newContainer, setNewContainer ])


//     useEffect(() => {
//         if(socket === null) return;

//         socket.on('receive-message', (message: any) => {
//             setMessages([ ...messages, message.message ])
//             setTotal(total => total + 1)

//             if(message.email === myEmail) {
//                 setTimeout(() => {
//                     scrollRef.current?.scrollIntoView()
//                 }, 0)
//             }
//         })


//         return () => {
//             socket.off('receive-message')
//         }
//     }, [ socket, messages ])



//     useEffect(() => {
//         if(!inView || total <= messages.length || skip > total || loading || activate || !messages.length || initialLoading || newContainer || !renderFirstTime) return;
        
//         const source = axios.CancelToken.source()

//         const getMoreMessages = async () => {
//             const _skip = skip + 30 
//             setActivate(true)
//             setLoading(true)
//             setSkip(skip => skip + 30)  

//             const result = (await axios.get(`${server}/api/conversation/show-conversation/${conversationId}?limit=${30}&skip=${_skip}`, { withCredentials: true })).data
            
//             setMessages([ ...result.messages.reverse(), ...messages ])
//             setPeopleIds([ ...result.people.reverse(), ...peopleIds ])
//             setLoading(false)
            

//             setTimeout(() => {
//                 scrollContainerRef.current?.scrollIntoView()
//             }, 0)
            
//             setTimeout(() => {
//                 setActivate(false)
//             }, 2000)
//         }

//         getMoreMessages()

//         return () => {
//             source.cancel() 
//         }
//     }, [ inView, activate, loading, total, initialLoading, newContainer, renderFirstTime ])

//     console.log(messages)


//     return { messages, loading, initialLoading, total, skip, activate, renderFirstTime, peopleIds }
// }

// export default useConversation;