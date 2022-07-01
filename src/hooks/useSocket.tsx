import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

import { server } from '../config/index'


export const useSocket = ({ userId }: { userId: string }) => {
    const [ socket, setSocket ] = useState<any>(null)

    useEffect(() => {
        const newSocket = io(`${server}`, { query: { id: userId } })
        setSocket(newSocket)

        return () => {
            newSocket.close()
        }
    }, [ userId ])

    return { socket }
}