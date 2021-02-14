import React from 'react';
import ExpertChatbot from 'src/views/widgets/ExpertChatbot';
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index';

const TheLayout = () => {

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
      <ExpertChatbot />
    </div>
  )
}

export default TheLayout
