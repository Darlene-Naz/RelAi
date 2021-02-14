import CIcon from '@coreui/icons-react';
import React from 'react';
import ChatBot from 'react-simple-chatbot';

function ExpertChatbot() {
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
                        end: true,
                    }, {
                        id: '4',
                        message: '{previousValue} please authenticate yourself for further communication',
                        end: true,
                    },
                ]}
        />
    )
}
export default ExpertChatbot;