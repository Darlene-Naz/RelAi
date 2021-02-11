import CIcon from '@coreui/icons-react';
import { CCard, CFade, CCardBody, CCardFooter, CCardHeader, CLink, CTextarea, CCol, CButton, CButtonGroup, CRow, CCollapse } from '@coreui/react';
import React, { useState } from 'react';
function WidgetTextEditor(props) {
    const [ collapsed, setCollapsed ] = useState(true)
    const [ showCard, setShowCard ] = useState(true)

    return (
        !props.hide && <CFade in={showCard}>
            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol sm="3">
                            <h4 id="traffic" className="card-title mb-0">Here's Your Data</h4>
                            <div className="small text-muted">November 2017</div>
                        </CCol>
                        <CCol sm="9" className="d-none d-md-block">
                            <div className="card-header-actions float-right">
                                <CLink className="card-header-action">
                                    <CIcon name="cil-settings" />
                                </CLink>
                                <CLink className="card-header-action" onClick={() => setCollapsed(!collapsed)}>
                                    <CIcon name={collapsed ? 'cil-chevron-bottom' : 'cil-chevron-top'} />
                                </CLink>
                                <CLink className="card-header-action" onClick={() => setShowCard(false)}>
                                    <CIcon name="cil-x-circle" />
                                </CLink>
                            </div>
                            <CButton color="primary" className="float-right mr-3">
                                <CIcon name="cil-cloud-download" />
                            </CButton>
                            <CButtonGroup className="float-right mr-3">
                                {
                                    [ 'Day', 'Month', 'Year' ].map(value => (
                                        <CButton
                                            color="outline-secondary"
                                            key={value}
                                            className="mx-0"
                                            active={value === 'Month'}
                                        >
                                            {value}
                                        </CButton>
                                    ))
                                }
                            </CButtonGroup>

                        </CCol>
                    </CRow>


                </CCardHeader>
                <CCollapse show={collapsed}>
                    <CCardBody>
                        <CTextarea
                            name="editorText"
                            id="editorText"
                            rows="2"
                            placeholder="Content..."
                            value={props.text}
                        />
                    </CCardBody>
                </CCollapse>

                <CCardFooter></CCardFooter>
            </CCard>
        </CFade>
    )
}
export default WidgetTextEditor;