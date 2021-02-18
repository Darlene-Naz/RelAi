import CIcon from '@coreui/icons-react';
import { CInput, CLink } from '@coreui/react';
import axios from 'axios';
import React, { useState } from 'react';
import ChatBot, { Loading } from 'react-simple-chatbot';

function ChatBotAuth(props) {
    const [ hideCall, setHideCall ] = useState(false)
    function getAuthToken(event) {
        const { value } = event.target
        axios.post('http://localhost:8000/api/v1/auth/get-auth-token', { 'access_code': value }, {})
            .then(res => {
                if (res.data.message.access_token === undefined) return props.onFinished({ message: "Sorry, some error occurred", error: true })
                localStorage.setItem('access_token', res.data.message.access_token)
                localStorage.setItem('refresh_token', res.data.message.refresh_token)
                localStorage.setItem('scope', res.data.message.scope)
                localStorage.setItem('token_type', res.data.message.token_type)
                localStorage.setItem('expiry_date', res.data.message.expiry_date)
                props.onFinished({ message: "You've been successfully authenticated!", error: false })
                props.triggerNextStep({ value: "You've been successfully authenticated!" })

            })
            .catch(e => {
                console.log(e);
                props.onFinished({ message: "Sorry, some error occurred", error: true })
                props.triggerNextStep({ value: "Sorry, some error occurred", trigger: '6' })

            })
    }
    if (!hideCall) {
        axios.get('http://localhost:8000/api/v1/auth/get-auth-link').then((res) => {
            console.log('IN')
            window.open(res.data.message, '_blank')
            setHideCall(true)
        }).catch((e) => console.log(e))
    }
    return (
        <CInput type='text' placeholder='Enter the access code' onChange={getAuthToken} />
    )
}

function ChatBotEvents(props) {
    const [ hideCall, setHideCall ] = useState(false)
    const [ value, setValue ] = useState('')

    if (!hideCall) {
        console.log(props.previousStep.value)
        axios.post(
            'http://localhost:8000/api/v1/event/check',
            {
                'text': props.previousStep.value,
                'token': JSON.stringify({
                    'access_token': localStorage.getItem('access_token'),
                    'refresh_token': localStorage.getItem('refresh_token'),
                    'scope': localStorage.getItem('scope'),
                    'token_type': localStorage.getItem('token_type'),
                    'expiry_date': localStorage.getItem('expiry_date')
                })
            },
            {}
        ).then(res => {
            console.log(res.status)
            // if (res.status === '500') return props.onFinished({ message: "Sorry, some error occurred", error: true })
            // props.onFinished({ message: res.data.message, error: false })
            console.log(res.data.message)
            setValue(JSON.stringify(res.data.message))
            props.triggerNextStep()
        }).catch(e => {
            console.log(e);
            // props.onFinished({ message: "Sorry, some error occurred", error: true })
            setValue('Sorry, some error occurred')
            props.triggerNextStep({ value: "Sorry, some error occurred" })
        })
        setHideCall(true)
    }
    return (hideCall ? value : <Loading />)
}

function ExpertChatbot() {
    const [ responseData, setMessage ] = useState({
        message: "",
        error: ""
    })
    function showMessage(data) {
        setMessage({ message: data.message, error: data.error })
    }
    return (
        <ChatBot
            headerTitle="Expert Bot"
            height='70vh'
            enableSmoothScroll={true}
            speechSynthesis={{ enable: true, lang: 'en' }}
            recognitionEnable={true}
            floating={true}
            placeholder='Type/Say something...'
            floatingIcon={<CIcon size='lg' style={{ color: 'white' }} name='cil-mic' />}
            steps={
                [
                    {
                        id: '1',
                        message: 'What is your name?',
                        trigger: '2',
                    },
                    {
                        id: '2',
                        user: true,
                        trigger: '3',
                    },
                    {
                        id: '3',
                        message: 'Hi {previousValue}, nice to meet you!',
                        trigger: '4',
                    },
                    {
                        id: '4',
                        message: 'Please authenticate yourself for further communication.',
                        trigger: '5',
                    },
                    {
                        id: '5',
                        component: <ChatBotAuth
                            onFinished={showMessage} />,
                        waitAction: true,
                        trigger: '6',
                    },
                    {
                        id: '6',
                        message: '{previousValue}',
                        trigger: responseData.error ? '5' : '7',
                    },
                    {
                        id: '7',
                        user: true,
                        trigger: '8'
                    },
                    {
                        id: '8',
                        component: <ChatBotEvents />,
                        asMessage: true,
                        waitAction: true,
                        trigger: '7'
                    },
                    {
                        id: '9',
                        user: true,
                        end: true
                    },
                ]
            }
        />
    )
}
export default ExpertChatbot;