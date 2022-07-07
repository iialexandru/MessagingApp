import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { parse } from 'node-html-parser'

import styles from '../../styles/scss/Home/Home.module.scss';
import MessSection from './Conversation/MessSection'
import Toolbar from './Toolbar'
import MessageContainer from './Conversation/MessageContainer'
import SocialContainer from './Social/SocialContainer'
import { server } from '../../config/index'
import { useSocket } from '../../hooks/useSocket'
import { receiveMessage, lastMessage, seenMessageByOther } from '../../actions/conversationActions'
import SkeletonMessSection from '../../components/Home/Conversation/SkeletonMessSection'
import Cover from '../../components/Home/Cover'

import { Section } from '@typings'


const Home = ({ username, email, userId, receiveMessage, _messages, lastMessage, lastMessages, seenMessageByOther }: { seenMessageByOther: any, lastMessages: any, username: string, email: string, userId: string, receiveMessage: any, _messages: any, lastMessage: any }) => {
    const [ section, setSection ] = useState<Section>('Messages')
    const [ conversations, setConversations ] = useState<any>(null)

    const [ conversationId, setConversationId ] = useState(null)
    const [ newContainer, setNewContainer ] = useState(false)

    const [ loading, setLoading ] = useState(false)

    const onMyMessage = ({ senderEmail }: { senderEmail: string }) => {
        console.log(email, senderEmail)
        if(email === senderEmail) {
            console.log(email, senderEmail)
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

 
    useEffect(() => {
        const source = axios.CancelToken.source()

        socket!.eventListeners({ receiveMessage: receiveMessageProp, seenMessageByOther: seenMessageByOtherProp, email, userId })
    
        lastMessage()

        const getConversations = async () => {
            setLoading(true)
            const result = (await axios.get(`${server}/api/conversation/show-conversations`, { withCredentials: true })).data

            setConversations(result.conversations)
            setLoading(false)
        }

        getConversations()

        return () => {
            source.cancel()
        }
    }, [ ])


    return (
        <div className={styles.container}>
            <div className={styles.mess_container}>
                <div className={styles.flex_list}>
                    <div className={styles.header}>
                        <div className={styles.headline}>
                            <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655985142/MessagingApp/Messages-icon_spndmi.png' width={35} height={35} alt='logo' />
                            <h2>Messager</h2>
                        </div>
                    </div>

                    <div className={styles.section_container}>
                        {conversations && 
                            conversations.map((conversation: any, key: number) => {

                                return (
                                    !conversation.group ?
                                        <MessSection key={key} setConversationId={setConversationId} setSection={setSection} myUsername={username} myEmail={email} person={conversation.people.filter((chatter: any) => chatter.email !== email)[0]} message={(lastMessages[conversation._id] && lastMessages[conversation._id].message) ? lastMessages[conversation._id].message : ''} seenMessage={lastMessages[conversation._id] ? lastMessages[conversation._id].seen : true} totalUnseen={lastMessages[conversation._id] ? lastMessages[conversation._id].totalUnseen : 0} conversationId={conversation._id} globalConversationId={conversationId} setNewContainer={setNewContainer}  />
                                    :
                                        <MessSection key={key} setConversationId={setConversationId} setSection={setSection} myUsername={username} myEmail={email} message={lastMessages[conversation._id].message ? lastMessages[conversation._id].message : ''} seenMessage={lastMessages[conversation._id] ? lastMessages[conversation._id].seen : true} totalUnseen={lastMessages[conversation._id] ? lastMessages[conversation._id].totalUnseen : 0} conversationId={conversation._id} setNewContainer={setNewContainer} globalConversationId={conversationId} />
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
                </div>

                <div className={styles.replacer}>
                    <Toolbar setSection={setSection} section={section} setNewContainer={setNewContainer} />
                    {(section === 'Messages' && conversationId) ? 
                        <MessageContainer scrollRef={scrollRef} globalConversationId={conversationId} newContainer={newContainer} setNewContainer={setNewContainer} userId={userId} myUsername={username} myEmail={email} conversationId={conversationId!} /> 
                    : (section === 'Messages' && !conversationId) && 
                        <Cover />
                    }
                    {section === 'Social' && <SocialContainer /> }
                </div>
            </div>
        </div>
    )
}

export default connect((state: any) => ({ email: state.auth.email, username: state.auth.username, userId: state.auth.userId, _messages: state.conversation.messages, _total: state.conversation.total, lastMessages: state.conversation.lastMessages  }), { receiveMessage, lastMessage, seenMessageByOther })(Home);