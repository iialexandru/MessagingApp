import type { FC } from 'react'
import { useState } from 'react'
import { format } from 'date-fns'

import styles from '../../../styles/scss/Home/Conversation/MessageContainer.module.scss';
import { useSocket } from '../../../hooks/useSocket'
import { CreateMessageProps } from '@typings'





const CreateMessage: FC<CreateMessageProps> = ({ conversationId, userId, addNotReadyMessage, myEmail, scrollRef, nrMessages, blocked }) => {
    const [ text, setText ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ start, setStart ] = useState(false)

    const socket = useSocket()

    const createIdForMessage = () => {
        let uniqueId = 0 

        if(nrMessages) {
            uniqueId = nrMessages.length

            for(let i = 0; i < nrMessages.length; i++) {
                if(uniqueId === nrMessages[i].messageId) {
                    uniqueId += 1
                    i = 0
                }
            }
        }

        return uniqueId
    }


    const [ files, setFiles ] = useState<any>([])

    const handleDeleteImage = (e: any, key: number) => {
        e.preventDefault();
        const newFiles = [...files]
        newFiles.splice(files.findIndex((el: any) => el.id === e.target.getAttribute('number-id')), 1)
        setFiles(newFiles)
    }

    const convertToBase64 = (file: any): any => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader()
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            resolve(fileReader.result)
          }
          fileReader.onerror = (error) => {
            reject(error)
          }
        })
    }

    const uploadPhoto = async (e: any) => {
        if(e.target.files[0] && e.target.files[0].size / 1000000 < 5 && files.length < 8) {
            const base64: string = await convertToBase64(e.target.files[0])
            setFiles([ ...files, { base64, id: files.length } ])
        }
    }


    const sendMessage_ = async (e: any) => {
        e.preventDefault()

        const date = format(new Date(), 'dd-MM-yyyy')

        if(start || loading || (!text.length && !files.length) || blocked) return;
        setStart(true)

        setLoading(true);
        setTimeout(() => {
            scrollRef.current?.scrollIntoView()
        }, 0)

        const msgId = createIdForMessage()

        addNotReadyMessage({ conversationId, id: msgId, text, date, email: myEmail, media: files })
        

        try {
            socket!.sendMessage({ text, date, conversationId, userId, files, id: msgId })
        } catch (err) {
            console.log(err)
        }


        setFiles([])
        setText('')
        setLoading(false)
        setStart(false)
        
    }

    return ( 
        <div className={styles.tooltext}>
            {Boolean(files.length) && 
                <div className={styles.container_images}>
                    {files.map((file: any, key: number) => {
                        return (
                            <div className={styles.tool_image} key={key}>
                                <img src={file.base64} width={80} height={80} alt='Img' />
                                <img id='delete' number-id={key} onClick={e => handleDeleteImage(e, key)} src='https://res.cloudinary.com/multimediarog/image/upload/v1656921395/MessagingApp/cancel-close-10373_ifa2cj.svg' width={20} height={20} alt='Delete' />
                            </div>
                        )
                    })}
                </div>
            }
            <div  className={styles.input_create}> 
                <input value={text} maxLength={1000} onChange={e => setText(e.target.value)} placeholder="Write a message..." onKeyDown={e => { if(e.key === 'Enter') { sendMessage_(e) } }} />
                <label htmlFor='file'>
                    <img src='https://res.cloudinary.com/multimediarog/image/upload/v1656920039/MessagingApp/photos-10608_2_nmxg2p.svg' width={30} height={30} alt='Images' />
                </label>
                {!loading && <input type='file' id='file' name='file' onChange={uploadPhoto} style={{ display: 'none' }} onClick={e => { const target = e.target as HTMLInputElement; target.value = '' } } accept='image/*' /> }
            </div>
            <div className={styles.send} onClick={e => sendMessage_(e)}>
                <img src={!blocked ? 'https://res.cloudinary.com/multimediarog/image/upload/v1656149617/MessagingApp/send-4006_ebpjrw.svg' : 'https://res.cloudinary.com/multimediarog/image/upload/v1657525036/MessagingApp/black-padlock-11724_hfyjhx.svg'} width={25} height={25} alt='Send' />
            </div>
        </div>
    )
}

export default CreateMessage;