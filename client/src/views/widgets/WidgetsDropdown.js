import React, { useState } from 'react'
import axios from 'axios'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CForm,
  CLabel,
  CInputFile,
  CAlert,
  CProgress,
  CInput,
  CInputGroup,
  CInputGroupText,
  CInputGroupAppend,
  CButton

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'

const WidgetsDropdown = () => {
  const [ inputData, setInputFile ] = useState({
    textFile: "",
    audioFile: "",
    videoFile: "",
    plainText: "",
  })
  const [ visible, setVisible ] = useState(0);

  function handleChange(e) {
    const { name, files } = e.target;
    setVisible(10);
    setInputFile({ ...inputData, [ name ]: files[ 0 ] })
  }

  function handleSubmit(event) {
    const file = new FormData();
    file.append('file', inputData.audioFile);
    axios.post('http://localhost:8000/api/v1/convert/audio-to-text', file, { headers: { 'content-type': 'multipart/form-data' } }).then(res => {
      console.log(res)
    }).catch(e => console.log(e))
    event.preventDefault();
  }

  return (

    <CRow>
      <CCol sm="24" lg="12">
        <CAlert
          color="warning"
          show={visible}
          closeButton
          onShowChange={setVisible}
        >
          Uploading in {visible} seconds!
          <CProgress
            striped
            color="warning"
            value={100 - Number(visible) * 10}
            size="xs"
            className="mb-12"
          />
        </CAlert>
      </CCol>
      <CCol sm="6" lg="3">
        <CForm onSubmit={handleSubmit} method="post" encType="multipart/form-data">
          <CInputFile
            id="textFile"
            name="textFile"
            className="inputFile"
            accept=".txt,.doc,.docx,application/msword"
            onChange={handleChange}
          />
          <CLabel
            htmlFor="textFile"
            style={{ width: '100%' }}>
            <CWidgetDropdown
              color="gradient-primary"
              header="Upload File"
              text="text files only"
              footerSlot={
                <div className="c-chart-wrapper mt-3 mx-3">
                  <ChartLineSimple
                    pointed
                    style={{ height: '70px' }}
                    dataPoints={[ 65, 59, 84, 84, 51, 55, 40 ]}
                    pointHoverBackgroundColor="primary"
                    label="Members"
                    labels="months"
                  />
                  <CInputGroup
                    className={(inputData.textFile === "") ? "mb-3 d-none" : "mb-3"}>
                    <CInput disabled placeholder={inputData.textFile.name} />
                    <CInputGroupAppend>
                      <CInputGroupText>
                        <CButton type="submit" name="text" className="p-0 m-0"><CIcon name="cil-cloud-upload" className="p-0 m-0" /></CButton>
                      </CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </div>
              }
            >
              <CIcon name="cil-file" className="c-chart-wrapper mt-3 mx-3" />
            </CWidgetDropdown>
          </CLabel>
        </CForm>
      </CCol>

      <CCol sm="6" lg="3">
        <CForm action="" method="post" onSubmit={handleSubmit} encType="multipart/form-data">
          <CInputFile
            id="audioFile"
            name="audioFile"
            className="inputFile"
            accept=".mp3,audio/*"
            onChange={handleChange} />
          <CLabel htmlFor="audioFile" style={{ width: '100%' }}>
            <CWidgetDropdown
              color="gradient-info"
              header="Audio"
              text=".mp3 , .wav"
              footerSlot={
                <div className="c-chart-wrapper mt-3 mx-3">
                  <ChartLineSimple
                    pointed
                    style={{ height: '70px' }}
                    dataPoints={[ 1, 18, 9, 17, 34, 22, 11 ]}
                    pointHoverBackgroundColor="info"
                    options={{ elements: { line: { tension: 0.00001 } } }}
                    label="Members"
                    labels="months"
                  />
                  <CInputGroup
                    className={(inputData.audioFile === "") ? "mb-3 d-none" : "mb-3"}>
                    <CInput disabled id="name" placeholder={inputData.audioFile.name} />
                    <CInputGroupAppend>
                      <CInputGroupText>
                        <CButton type="submit" name="audio" className="p-0 m-0"><CIcon name="cil-cloud-upload" className="p-0 m-0" /></CButton>
                      </CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </div>
              }
            >
              <CIcon name="cil-audio-spectrum" className="c-chart-wrapper mt-3 mx-3" />
              {/* <CDropdown>
            <CDropdownToggle caret={false} color="transparent">
              <CIcon name="cil-location-pin" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown> */}
            </CWidgetDropdown>
          </CLabel>
        </CForm>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header="9.823"
          text="Members online"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{ height: '70px' }}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[ 78, 81, 80, 45, 34, 12, 40 ]}
              options={{ elements: { line: { borderWidth: 2.5 } } }}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header="9.823"
          text="Members online"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle caret className="text-white" color="transparent">
              <CIcon name="cil-audio-spectrum" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

    </CRow>

  )
}

export default WidgetsDropdown
