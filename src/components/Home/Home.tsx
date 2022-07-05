import { useState, useEffect } from 'react'
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
import { receiveMessage, lastMessage } from '../../actions/conversationActions'

import { Section } from '@typings'


const Home = ({ username, email, userId, receiveMessage, _messages, lastMessage, lastMessages }: { lastMessages: any, username: string, email: string, userId: string, receiveMessage: any, _messages: any, lastMessage: any }) => {
    const [ section, setSection ] = useState<Section>('None')
    const [ conversations, setConversations ] = useState<any>(null)

    const [ conversationId, setConversationId ] = useState(null)
    const [ newContainer, setNewContainer ] = useState(false)


    const socket = useSocket()

    const receiveMessageProp = ({ conversationId, message }: { conversationId: string, message: string }) => {
        receiveMessage({ conversationId, message })
    }

 
    useEffect(() => {
        const source = axios.CancelToken.source()

        socket!.eventListeners({ receiveMessage: receiveMessageProp, email })
    
        lastMessage()

        const getConversations = async () => {
            const result = (await axios.get(`${server}/api/conversation/show-conversations`, { withCredentials: true })).data

            setConversations(result.conversations)
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
                                        <MessSection key={key} setConversationId={setConversationId} setSection={setSection} myUsername={username} myEmail={email} person={conversation.people.filter((chatter: any) => chatter.email !== email)[0]} message={lastMessages[conversation._id] ? lastMessages[conversation._id] : ''} conversationId={conversation._id} globalConversationId={conversationId} setNewContainer={setNewContainer}  />
                                    :
                                        <MessSection key={key} setConversationId={setConversationId} setSection={setSection} myUsername={username} myEmail={email} message={lastMessages[conversation._id] ? lastMessages[conversation._id] : ''} conversationId={conversation._id} setNewContainer={setNewContainer} globalConversationId={conversationId} />
                                ) 
                            })
                        }                        
                    </div>
                </div>

                <div className={styles.replacer}>
                    <Toolbar setSection={setSection} section={section} setNewContainer={setNewContainer} />
                    {(section === 'Messages' && conversationId) && <MessageContainer newContainer={newContainer} setNewContainer={setNewContainer} userId={userId} myUsername={username} myEmail={email} conversationId={conversationId!} /> }
                    {section === 'Social' && <SocialContainer /> }
                </div>
            </div>
        </div>
    )
}

export default connect((state: any) => ({ email: state.auth.email, username: state.auth.username, userId: state.auth.userId, _messages: state.conversation.messages, _total: state.conversation.total, lastMessages: state.conversation.lastMessages  }), { receiveMessage, lastMessage })(Home);