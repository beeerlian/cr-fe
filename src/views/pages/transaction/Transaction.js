/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CAvatar,
  CButton,
  CButtonGroup,
  CCardFooter,
  CProgress,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CHeaderDivider,
  CContainer,
  CCardTitle,
  CAccordion,
  CAccordionHeader,
  CAccordionBody,
  CAccordionItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'

import { getAllTransaction, getTransactionById } from 'src/services/transaction'
import Page500 from '../page500/Page500'
import Page404 from '../loading/Loading'

const titleCase = (s) =>
  s
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
    .replace(/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase()) // First char after each -/_

const DetailContent = ({ id }) => {
  const initialState = {
    data: null,
    error: null,
  }

  const [initState, setInitState] = useState(initialState)

  const fetchInitState = async () => {
    try {
      const { data: transResponse } = await getTransactionById(id)
      console.log(transResponse)
      setInitState({
        ...initialState,
        data: transResponse.data,
      })
    } catch (error) {
      console.log(error)
      setInitState({
        ...initialState,
        error,
      })
    }
  }

  useEffect(() => {
    fetchInitState()
  }, [])

  if (initState.error) {
    return <Page404></Page404>
  }
  return (
    <CRow>
      {Object.keys(initState.data ?? {}).map((key, index) => {
        if (key !== 'order' || key !== 'teller') {
          return <DataTile key={index} title={key} value={initState.data?.order[key]} />
        }
      })}
      <CAccordion flush>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>Order</CAccordionHeader>
          <CAccordionBody>
            <CRow>
              <CContainer className="px-4">
                {Object.keys(initState.data?.order ?? {}).map((key, index) => (
                  <DataTile key={index} title={key} value={initState.data?.order[key]} />
                ))}
              </CContainer>
            </CRow>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={2}>
          <CAccordionHeader>Teller</CAccordionHeader>
          <CAccordionBody>
            <CRow>
              <CContainer className="px-4">
                {Object.keys(initState.data?.teller ?? {}).map((key, index) => (
                  <DataTile key={index} title={key} value={initState.data?.teller[key]} />
                ))}
              </CContainer>
            </CRow>
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
    </CRow>
  )
}

const DataTile = ({ title, value }) => {
  return (
    <CRow className="py-1" xs={{ gutterX: 5 }}>
      <CCol>
        <div className="p-1 ">{titleCase(title)}</div>
      </CCol>
      <CCol>
        <div className="p-1 ">{value}</div>
      </CCol>
    </CRow>
  )
}

const Transactions = () => {
  const [openDetailModal, setOpenDetailModal] = React.useState(false)
  const [transaction, setTransaction] = React.useState([])
  const [selectedTrans, setSelectedTrans] = React.useState(null)

  const fetchAllTransaction = async () => {
    try {
      const { data: responseData } = await getAllTransaction()
      console.log(responseData)
      setTransaction(responseData.data)
    } catch (error) {
      console.log(error)
      setTransaction([])
    }
  }

  React.useEffect(() => {
    fetchAllTransaction()
  }, [])

  return (
    <>
      <CModal size="xl" visible={openDetailModal} onClose={() => setOpenDetailModal(false)}>
        <CModalHeader>
          <CModalTitle>Transaction Detail</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <DetailContent id={selectedTrans?.id} />
        </CModalBody>
      </CModal>
      <CCard className="mb-4">
        <CCardHeader>
          <CCardTitle>TRANSACTIONS</CCardTitle>
        </CCardHeader>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell>Order ID</CTableHeaderCell>
                <CTableHeaderCell>Item ID</CTableHeaderCell>
                <CTableHeaderCell>Total Rental Day</CTableHeaderCell>
                <CTableHeaderCell>Total Price</CTableHeaderCell>
                <CTableHeaderCell>Created At</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {transaction.map((trans, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    <div>{trans.id}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{trans.order_id}</div>
                    <div className="small text-medium-emphasis"></div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>
                      <strong>{trans.teller_id}</strong>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>
                      <strong>{trans.total_rental_days} day</strong>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>
                      <strong>Rp. {trans.total_price}</strong>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>
                      <strong>{trans.created_at}</strong>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      onClick={() => {
                        setSelectedTrans(trans)
                        setOpenDetailModal(true)
                      }}
                    >
                      Detail
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
        <CCardFooter>
          <CButton
            onClick={() => {
              setOpenDetailModal(true)
            }}
          >
            Add
          </CButton>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default Transactions
