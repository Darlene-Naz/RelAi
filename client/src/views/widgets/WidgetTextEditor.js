import CIcon from '@coreui/icons-react';
import axios from 'axios'
import Highlighter from "react-highlight-words";
import Editor from './Editor'
import { CCard, CFade, CCardBody, CCardFooter, CCardHeader, CLink, CTextarea, CCol, CButton, CButtonGroup, CRow, CCollapse, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react';
import React, { useState } from 'react';

function WidgetTextEditor(props) {
    const [ collapsed, setCollapsed ] = useState(true)
    const [ showCard, setShowCard ] = useState(true)
    const [ changedData, updateData ] = useState(props.text)
    const [ analysedData, showAnalysis ] = useState({
        showSummary: false,

    })
    function showUpdatedData(e) {
        const { value } = e.target;
        updateData(value)
        showAnalysis({ showSummary: false })
    }
    function onSummarize(event) {
        showAnalysis({ ...analysedData, showSummary: true })
    }
    function onAnalyze(event) {
        if (changedData === "") updateData(props.text);
        axios.post('http://localhost:8000/api/v1/text/analyze', { text: changedData === "" ? props.text : changedData }, { headers: { 'content-type': 'application/json' } })
            .then(res => {
                console.log(res.data);
                showAnalysis({ ...analysedData, message: res.data.message })
            })
            .catch(e => console.log(e))
        event.preventDefault()
    }
    return (
        <CFade in={showCard}>
            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol sm="3">
                            <h4 id="traffic" className="card-title mb-0">Here's Your Data</h4>
                            <div className="small text-muted">November 2017</div>
                        </CCol>
                        <CCol sm="9" className="d-none d-md-block">
                            <div className="card-header-actions float-right">
                                <CLink className="card-header-action" onClick={() => setCollapsed(!collapsed)}>
                                    <CIcon name={collapsed ? 'cil-chevron-bottom' : 'cil-chevron-top'} />
                                </CLink>
                                <CLink className="card-header-action" onClick={() => setShowCard(true)}>
                                    <CIcon name="cil-x-circle" />
                                </CLink>
                            </div>
                            <CDropdown>
                                <CDropdownToggle caret={false} color="primary" className="float-right mr-3">
                                    <CIcon className="my-0" name="cil-cloud-download" />
                                </CDropdownToggle>
                                <CDropdownMenu className="pt-0" placement="bottom-end">
                                    <CDropdownItem>.pdf</CDropdownItem>
                                    <CDropdownItem>.txt</CDropdownItem>
                                    <CDropdownItem>.doc</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                            <CButtonGroup className="float-right mr-3">
                                {
                                    [ 'Lemmas', 'Phrases', 'Sentences' ].map(value => (
                                        <CButton
                                            color="outline-secondary"
                                            key={value}
                                            className="mx-0"
                                            active={value === 'Phrases'}
                                        >
                                            {value}
                                        </CButton>
                                    ))
                                }
                            </CButtonGroup>
                            <CButton shape="pill" color="danger" className="float-right mr-3 text-center" onClick={onSummarize}>Summarize</CButton>
                            <CButton shape="pill" color="info" className="float-right mr-3 text-center" onClick={onAnalyze} >Analyze</CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCollapse show={collapsed}>
                    <CCardBody>
                        <Editor />
                        {
                            (!analysedData.showSummary) ?
                                <CTextarea
                                    name="editorText"
                                    id="editorText"
                                    rows="9"
                                    placeholder="Content..."
                                    value={changedData}
                                    onChange={showUpdatedData}
                                /> :
                                <Highlighter
                                    highlightClassName="YourHighlightClass"
                                    searchWords={analysedData.message.mainPhrases.map(value => {
                                        return value.value.replace('___', '−')
                                    })}
                                    autoEscape={true}
                                    textToHighlight={changedData}
                                />
                        }
                    </CCardBody>
                </CCollapse>
                <CCardFooter>
                </CCardFooter>
            </CCard>
        </CFade>
    )
}
export default WidgetTextEditor;