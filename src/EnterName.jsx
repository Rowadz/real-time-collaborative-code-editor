import React, { useRef } from 'react'
import {
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react'
import { useMutation } from 'react-query'
import { useStore } from './store'
import axios from 'axios'

const EnterName = () => {
  const inputRef = useRef()
  const roomIdRef = useRef()
  const toast = useToast()
  const { setUsername, setRoomId } = useStore(({ setUsername, setRoomId }) => ({
    setUsername,
    setRoomId,
  }))

  const { mutateAsync } = useMutation(({ username, roomId, uri }) => {
    return axios.post(`http://localhost:3001/${uri}`, {
      username,
      roomId,
    })
  })

  const createRoom = async () => {
    const value = inputRef.current?.value

    if (!value) {
      toast({
        title: 'Please enter your username',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    }
    await mutateAsync(
      { username: value, uri: 'create-room-with-user' },
      {
        onSuccess: ({ data }) => {
          setRoomId(data.roomId)
          toast({
            title: 'We created your username, you will find yourself in a room',
            description: 'Share the room id with anyone',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        },
      }
    )
    setUsername(value)
  }

  const enterRoom = async () => {
    const value = inputRef.current?.value
    const roomIdValue = roomIdRef.current?.value

    if (!value || !roomIdValue) {
      toast({
        title: 'Please enter text in both inputs',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    }
    setRoomId(roomIdValue)
    setUsername(value)
  }

  return (
    <>
      <InputGroup size="lg">
        <Input
          pr="4.5rem"
          size="lg"
          placeholder="Enter your name"
          ref={inputRef}
        />
        <InputRightElement width="4.5rem">
          <Button size="lg" onClick={createRoom}>
            Go!
          </Button>
        </InputRightElement>
      </InputGroup>
      <InputGroup size="lg">
        <Input
          pr="4.5rem"
          size="lg"
          placeholder="Enter a room id"
          ref={roomIdRef}
        />
        <InputRightElement width="4.5rem">
          <Button size="lg" onClick={enterRoom}>
            Join!
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  )
}

export default EnterName
