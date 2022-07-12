import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import styles from '../../styles/scss/Home/Home.module.scss';
import MessSection from './Conversation/MessSection'
import Toolbar from './Toolbar'
import MessageContainer from './Conversation/MessageContainer'
import SocialContainer from './Social/SocialContainer'
import { useSocket } from '../../hooks/useSocket'
import { receiveMessage, lastMessage, seenMessageByOther, getConversations, removeConversation, addConversation } from '../../actions/conversationActions'
import SkeletonMessSection from '../../components/Home/Conversation/SkeletonMessSection'
import Cover from '../../components/Home/Cover'
import useWindowSize from '../../utils/useWindowSize'

import { Section } from '@typings'


const Home = ({ username, email, userId, receiveMessage, _messages, lastMessage, lastMessages, seenMessageByOther, getConversations, conversations, removeConversation, addConversation }: { addConversation: any, removeConversation: any, conversations: any, getConversations: any, seenMessageByOther: any, lastMessages: any, username: string, email: string, userId: string, receiveMessage: any, _messages: any, lastMessage: any }) => {
    const [ section, setSection ] = useState<Section>('Messages')

    const [ width ] = useWindowSize()

    const [ conversationId, setConversationId ] = useState<string | null>(null)
    const [ newContainer, setNewContainer ] = useState(false)

    const [ loading, setLoading ] = useState(false)

    const mcRef = useRef<any>(null)
    const onMyMessage = ({ senderEmail }: { senderEmail: string }) => {
        if(email === senderEmail || (mcRef.current?.scrollTop < mcRef.current?.scrollHeight - mcRef.current?.clientHeight + 35 && mcRef.current?.scrollTop > mcRef.current?.scrollHeight - mcRef.current?.clientHeight - 35)) {
            setTimeout(() => scrollRef.current?.scrollIntoView(), 0)
        } 
    }

    const scrollRef = useRef<any>(null)


    const socket = useSocket()


    const receiveMessageProp = ({ conversationId, message, email, userId, finished, id, senderEmail }: { senderEmail: string, finished: boolean, id: number, email: string, conversationId: string, message: string, userId: string }) => {
        receiveMessage({ conversationId, message, userId, email, onMyMessage, finished, id, senderEmail })
    }

    const seenMessageByOtherProp = ({ conversationId }: { conversationId: string }) => {
        seenMessageByOther({ conversationId })
    }

    const removeConversationProp = ({ conversationId }: { conversationId: string }) => {
        const onSuccess = () => {
            setConversationId(null)
        }
        
        removeConversation({ conversationId, onSuccess })
    }

    const addConversationProp = ({ conversation }: { conversation: any }) => {
        const onAdded = () => {
            socket!.joinRoom({ conversation })
        }

        addConversation({ conversation, onAdded })
    }

 
    useEffect(() => {
        const source = axios.CancelToken.source()

        socket!.eventListeners({ receiveMessage: receiveMessageProp, seenMessageByOther: seenMessageByOtherProp, email, userId, removeConversation: removeConversationProp, addConversation: addConversationProp })
    
        lastMessage()

        const initialConversations = async () => {
            setLoading(true)
            const onFinish = () => {
                setLoading(false)
            }

            getConversations({ onFinish })
        }

        initialConversations()

        return () => {
            source.cancel()
        }
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.mess_container}>
                <div className={styles.flex_list}>
                    <div className={styles.header}>
                        <div className={styles.headline}>
                            <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655985142/MessagingApp/Messages-icon_spndmi.png' width={35} height={35} alt='logo' />
                            <h2>Messager</h2>
                        </div>

                        {((width < 800 && conversationId) || (width < 800 && section === 'Social')) ?
                            <img src='https://res.cloudinary.com/multimediarog/image/upload/v1657630110/MessagingApp/curved-arrow-2264_gavulg.svg' onClick={() => { setConversationId(null); setSection('Messages') }} width={30} height={30} alt='Back' />
                         : (width < 800 && !conversationId) &&
                            <img src='https://res.cloudinary.com/multimediarog/image/upload/v1656246252/MessagingApp/team-5701_1_uqv9wx.svg' onClick={() => { setConversationId(null); setSection('Social') }} width={30} height={30} alt='Messages' />
                        }
                    </div>

                        {((!conversationId && width < 800 && section !== 'Social') || width >= 800) &&
                            <div className={styles.section_container}>
                                {conversations && 
                                    conversations.map((conversation: any, key: number) => {
                                        return (
                                            !conversation.group ?
                                                <MessSection key={key} 
                                                            setConversationId={setConversationId} 
                                                            setSection={setSection} 
                                                            myUsername={username} 
                                                            myEmail={email} 
                                                            person={conversation.people ? conversation.people.filter((chatter: any) => chatter.email !== email)[0] : ''} 
                                                            message={(lastMessages[conversation._id] && lastMessages[conversation._id].message) ? lastMessages[conversation._id].message : ''} 
                                                            seenMessage={lastMessages[conversation._id] ? lastMessages[conversation._id].seen : true} 
                                                            totalUnseen={lastMessages[conversation._id] ? lastMessages[conversation._id].totalUnseen : 0} 
                                                            conversationId={conversation._id} 
                                                            globalConversationId={conversationId} 
                                                            setNewContainer={setNewContainer}  />
                                            :
                                                <MessSection key={key} 
                                                            setConversationId={setConversationId} 
                                                            setSection={setSection} 
                                                            myUsername={username} 
                                                            myEmail={email} 
                                                            message={(lastMessages[conversation._id] && lastMessages[conversation._id].message) ? lastMessages[conversation._id].message : ''} 
                                                            seenMessage={lastMessages[conversation._id] ? lastMessages[conversation._id].seen : true} 
                                                            totalUnseen={lastMessages[conversation._id] ? lastMessages[conversation._id].totalUnseen : 0} 
                                                            conversationId={conversation._id} 
                                                            setNewContainer={setNewContainer} 
                                                            globalConversationId={conversationId} />
                                        ) 
                                    })
                                }      

                                {loading &&
                                    <>
                                        <SkeletonMessSection />               
                                        <SkeletonMessSection />               
                                        <SkeletonMessSection />               
                                        <SkeletonMessSection />   
                                    </>
                                }            
                            </div>
                        }
                        
                        {(conversationId && width < 800 && section === 'Messages') &&
                            <MessageContainer blocked={conversations.filter((conv: any) => conv._id === conversationId)[0] ? conversations.filter((conv: any) => conv._id === conversationId)[0].blocked : false} mcRef={mcRef} scrollRef={scrollRef} globalConversationId={conversationId} newContainer={newContainer} setNewContainer={setNewContainer} userId={userId} myUsername={username} myEmail={email} conversationId={conversationId!} /> 
                        }

                        {(!conversationId && width < 800 && section === 'Social') &&
                            <SocialContainer setConversationId={setConversationId} />
                        }
                </div>

                {width >= 800 &&
                    <div className={styles.replacer}>
                        <Toolbar setSection={setSection} section={section} setNewContainer={setNewContainer} />
                        {(section === 'Messages' && conversationId) ? 
                            <MessageContainer blocked={conversations.filter((conv: any) => conv._id === conversationId)[0] ? conversations.filter((conv: any) => conv._id === conversationId)[0].blocked : false} mcRef={mcRef} scrollRef={scrollRef} globalConversationId={conversationId} newContainer={newContainer} setNewContainer={setNewContainer} userId={userId} myUsername={username} myEmail={email} conversationId={conversationId!} /> 
                        : (section === 'Messages' && !conversationId) && 
                            <Cover />
                        }
                        {section === 'Social' && <SocialContainer setConversationId={setConversationId} /> }
                    </div>
                }
            </div>
        </div>
    )
}

export default connect((state: any) => ({ conversations: state.conversation.conversations, email: state.auth.email, username: state.auth.username, userId: state.auth.userId, _messages: state.conversation.messages, _total: state.conversation.total, lastMessages: state.conversation.lastMessages  }), { receiveMessage, lastMessage, seenMessageByOther, getConversations, removeConversation, addConversation })(Home);