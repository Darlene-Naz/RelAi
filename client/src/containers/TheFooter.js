import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1">&copy; 2021 Copyright. </span>
        <b>
          Made with 💙 by
        <a href="https://github.com/Darlene-Naz" target="_blank" rel="noopener noreferrer" className="myFooter"> Darlene Nazareth </a>
        and
        <a href="http://sherwyn11.github.io/" target="_blank" rel="noopener noreferrer" className="myFooter"> Sherwyn D'souza</a>
        </b>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" className="myFooter" rel="noopener noreferrer">React</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
