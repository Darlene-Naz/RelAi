import React, { useState } from 'react'
import axios from 'axios'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CForm,
  CLabel,
  CInputFile,
  CAlert,
  CProgress,
  CInput,
  CInputGroup,
  CInputGroupText,
  CInputGroupAppend,
  CButton, CTextarea

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'

const WidgetsDropdown = (props) => {
  const [ inputData, setInputFile ] = useState({
    textFile: "",
    audioFile: "",
    videoFile: "",
    plainText: ""
  })
  const [ visible, setVisible ] = useState(0);

  function handleChange(e) {
    const { name, files } = e.target;
    console.log(name)
    console.log(files)
    setVisible(10);
    setInputFile({ ...inputData, [ name ]: files[ 0 ] })
  }

  function handleSubmit(event) {
    const { name } = event.target
    console.log(name)
    const file = new FormData();
    if (name === "text" || name === "audio" || name === "video") {
      file.append('file', inputData[ name + "File" ]);
      axios.post('http://localhost:8000/api/v1/convert/' + name + 'file-to-text', file, { headers: { 'content-type': 'multipart/form-data' } })
        .then(res => {
          props.onConvertedData(res.data.message);
        })
        .catch(e => console.log(e))
    } else if (name === "plainText") {
      axios.post('', file, {}).then(res => {
        console.log(res)
      }).catch(e => console.log(e))
    }
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
        <CForm name="text" onSubmit={handleSubmit} method="post" encType="multipart/form-data">
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
              header="Documents"
              text="Upload any text file"
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
                        <CButton type="submit" className="p-0 m-0"><CIcon name="cil-cloud-upload" className="p-0 m-0" /></CButton>
                      </CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </div>
              }
            >
              <div className="btn">+📄</div>
              {/* name="cil-file" className="c-chart-wrapper mt-3 mx-3"  */}
            </CWidgetDropdown>
          </CLabel>
        </CForm>
      </CCol>

      <CCol sm="6" lg="3">
        <CForm name="audio" method="post" onSubmit={handleSubmit} encType="multipart/form-data">
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
              text="Upload a .mp3 .wav "
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
                    <CInput disabled placeholder={inputData.audioFile.name} />
                    <CInputGroupAppend>
                      <CInputGroupText>
                        <CButton type="submit" className="p-0 m-0"><CIcon name="cil-cloud-upload" className="p-0 m-0" /></CButton>
                      </CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </div>
              }
            >
              <div className="btn">🎧</div>
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
        <CForm name="video" method="post" onSubmit={handleSubmit} encType="multipart/form-data">
          <CInputFile
            id="videoFile"
            name="videoFile"
            className="inputFile"
            accept="video/*"
            onChange={handleChange} />
          <CLabel htmlFor="videoFile" style={{ width: '100%' }}>
            <CWidgetDropdown
              color="gradient-warning"
              header="Video"
              text="Upload any meet..."
              footerSlot={
                <div className="mt-3">

                  <ChartLineSimple
                    style={{ height: '70px' }}
                    backgroundColor="rgba(255,255,255,.2)"
                    dataPoints={[ 78, 81, 80, 45, 34, 12, 40 ]}
                    options={{ elements: { line: { borderWidth: 2.5 } } }}
                    pointHoverBackgroundColor="warning"
                    label="Members"
                    labels="months"
                  />
                  <CInputGroup
                    className={(inputData.videoFile === "") ? "c-chart-wrapper mb-3 mx-3 d-none" : "c-chart-wrapper mb-3 mx-3"}>
                    <CInput disabled id="name" placeholder={inputData.plainText.name} />
                    <CInputGroupAppend>
                      <CInputGroupText>
                        <CButton type="submit" className="p-0 m-0"><CIcon name="cil-cloud-upload" className="p-0 m-0" /></CButton>
                      </CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </div>
              }
            >
              <div className="btn">🎥</div>

              {/* <CDropdown>
                <CDropdownToggle color="transparent">
                  <CIcon name="cil-settings" />
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
        <CForm name="textarea" method="post" onSubmit={handleSubmit} encType="multipart/form-data">
          <CWidgetDropdown
            color="gradient-danger"
            header="Paste Text"
            text="Just Ctrl C + Ctrl V"
            footerSlot={
              <div className="c-chart-wrapper mt-3 mx-3">

                {/* <ChartBarSimple
                  className="mt-3 mx-3"
                  style={{ height: '70px' }}
                  backgroundColor="rgb(250, 152, 152)"
                  label="Members"
                  labels="months"
                /> */}
                <CInputGroup
                  className="mb-3">
                  <CTextarea
                    name="plainText"
                    id="plainText"
                    rows="2"
                    placeholder="Content..."
                    onChange={handleChange}
                  />
                  <CInputGroupAppend>
                    <CInputGroupText>
                      <CButton type="submit" className="p-0 m-0"><CIcon name="cil-cloud-upload" className="p-0 m-0" /></CButton>
                    </CInputGroupText>
                  </CInputGroupAppend>
                </CInputGroup>
              </div>
            }
          >
            <div className="btn">📝</div>

            {/* <CDropdown>
                    <CDropdownToggle caret className="text-white" color="transparent">
                      <CIcon name="cil-audio-spectrum" />
                    </CDropdownToggle>
                    <CDropdownMenu className="pt-0" placement="bottom-end">
                      <CDropdownItem>Action</CDropdownItem>
                      <CDropdownItem>Another action</CDropdownItem>
                      <CDropdownItem>Something else here...</CDropdownItem>
                      <CDropdownItem disabled>Disabled action</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown> */}
          </CWidgetDropdown>
        </CForm>
      </CCol>
    </CRow >
  )
}

export default WidgetsDropdown
