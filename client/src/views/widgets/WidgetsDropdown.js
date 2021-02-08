import React from 'react'
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
  CProgress

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'

const WidgetsDropdown = () => {
  const [ visible, setVisible ] = React.useState(0);
  function handleChange(event) {
    console.log(event.target.value);
    }


    function handleSubmit(event){
      event.preventDefault();
    }
  // render
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
        <CForm onSubmit={handleSubmit} method="post">
          <CInputFile id="textFile" className="inputFile" accept=".txt,.doc,.docx,application/msword" onChange={(e) => { setVisible(10); handleChange(e)}} />
          <CLabel htmlFor="textFile" style={{ width: '100%' }}>
            <CWidgetDropdown
              color="gradient-primary"
              header="Upload File"
              text="text files only"
              footerSlot={
                <div>
                  <ChartLineSimple
                    pointed
                    className="c-chart-wrapper mt-3 mx-3"
                    style={{ height: '70px' }}
                    dataPoints={[ 65, 59, 84, 84, 51, 55, 40 ]}
                    pointHoverBackgroundColor="primary"
                    label="Members"
                    labels="months"
                  />
                </div>
              }
            >
              <CIcon name="cil-file" className="c-chart-wrapper mt-3 mx-3" />
            </CWidgetDropdown>
          </CLabel>
        </CForm>
      </CCol>

      <CCol sm="6" lg="3">
        <CForm action="" method="post">
          <CInputFile id="audioFile" className="inputFile" accept=".mp3,audio/*" onChange={() => { setVisible(10);}} />
          <CLabel htmlFor="audioFile" style={{ width: '100%' }}>
            <CWidgetDropdown
              color="gradient-info"
              header="Audio"
              text=".mp3 , .wav"
              footerSlot={
                <ChartLineSimple
                  pointed
                  className="mt-3 mx-3"
                  style={{ height: '70px' }}
                  dataPoints={[ 1, 18, 9, 17, 34, 22, 11 ]}
                  pointHoverBackgroundColor="info"
                  options={{ elements: { line: { tension: 0.00001 } } }}
                  label="Members"
                  labels="months"
                />
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
