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
  CInputGroup,
  CForm,
  CFormInput,
  CInputGroupText,
  CFormLabel,
  CFormSelect,
  CCardTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'

import { getAllTransaction } from 'src/services/transaction'

const AddForm = ({ onSuccess }) => {
  // const createInitialState = {
  //   data: null,
  //   error: null,
  // }

  // const initialState = {
  //   user: [],
  //   order: [],
  //   error: null,
  // }

  // const [createRes, setCreateRes] = useState(createInitialState)
  // const [initState, setInitState] = useState(initialState)

  // const submit = (e) => {
  //   e.preventDefault()
  //   console.log(e)
  //   onCreateItem({
  //     order_id: e.target.order_id.value,
  //     teller_id: e.target.teller_id.value,
  //   })
  // }

  // const onCreateItem = async (body) => {
  //   try {
  //     const { data: responseData } = await createOrder(body)
  //     console.log(responseData)
  //     setCreateRes({
  //       ...createInitialState,
  //       data: responseData.data,
  //     })
  //   } catch (error) {
  //     console.log(error)
  //     setCreateRes({
  //       ...createInitialState,
  //       error,
  //     })
  //   }
  // }

  // const fetchInitState = async () => {
  //   try {
  //     const { data: itemRes } = await getAllItem()
  //     const { data: userRes } = await getUsers()
  //     setInitState({
  //       ...initialState,
  //       item: itemRes.data,
  //       user: userRes.data,
  //     })
  //   } catch (error) {
  //     console.log(error)
  //     setInitState({
  //       ...initialState,
  //       error,
  //     })
  //   }
  // }

  // useEffect(() => {
  //   if (initState.error) {
  //     onSuccess()
  //   }
  // }, [initState])

  // useEffect(() => {
  //   fetchInitState()
  // }, [])

  // useEffect(() => {
  //   if (createRes.data) {
  //     onSuccess()
  //   }
  // }, [createRes])
  return (
    <>
      <CForm>
        <CInputGroup className="mb-3">
          <CRow>
            <CRow>
              <CFormLabel>Teller</CFormLabel>
            </CRow>
            <CFormSelect
              className="px-2 mx-2"
              name="teller_id"
              type="select"
              placeholder="Status"
              autoComplete="Status"
            >
              <option>Pilih teller</option>
              {[].map((user, index) => (
                <option key={index} value={user.id}>
                  {user.email}
                </option>
              ))}
            </CFormSelect>
          </CRow>
        </CInputGroup>
        <CRow>
          <CCol xs={6}>
            <CButton type="submit" color="primary" className="px-4">
              Login
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

const Transactions = () => {
  const [openAddModal, setOpenAddModal] = React.useState(false)
  const [transaction, setTransaction] = React.useState([])

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
      <CModal size="xl" visible={openAddModal} onClose={() => setOpenAddModal(false)}>
        <CModalHeader>
          <CModalTitle>Add Transaction</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <AddForm />
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
                      <strong>{trans.total_price}</strong>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>
                      <strong>{trans.created_at}</strong>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
        <CCardFooter>
          <CButton
            onClick={() => {
              setOpenAddModal(true)
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
