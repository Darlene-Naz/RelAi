import React, { lazy, useState } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import MainChartExample from '../charts/MainChartExample.js'
import WidgetTextEditor from '../widgets/WidgetTextEditor.js'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {
  const [ editor, setEditorData ] = useState({
    key: 0,
    data: "",
    hide: true
  })
  function addEditorWidget(data) {
    setEditorData((prev) => { return { key: prev.key + 1, hide: false, data: data } })
  }
  return (
    <>
      <WidgetsDropdown onConvertedData={addEditorWidget} />
      {!editor.hide && <WidgetTextEditor key={editor.key} id={editor.key} text={editor.data} />}
    </>
  )
}

export default Dashboard
