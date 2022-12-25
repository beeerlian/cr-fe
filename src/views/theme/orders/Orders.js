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
  CFormLabel,
  CFormSelect,
  CInputGroupText,
  CCardTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'

import { getAllOrder, createOrder } from 'src/services/order'
import { getUsers } from 'src/services/users'
import { getAllItem } from 'src/services/items'
import { createTransaction } from 'src/services/transaction'

import Page500 from 'src/views/pages/page500/Page500'

const OrderDoneForm = ({ order, onSuccess }) => {
  const createInitialState = {
    data: null,
    error: null,
  }

  const initialState = {
    user: [],
    error: null,
  }

  const [createRes, setCreateRes] = useState(createInitialState)
  const [initState, setInitState] = useState(initialState)

  const submit = (e) => {
    e.preventDefault()
    console.log(e)
    onCreateItem({
      order_id: order.id,
      teller_id: e.target.teller_id.value,
    })
  }

  const onCreateItem = async (body) => {
    try {
      const { data: responseData } = await createTransaction(body)
      console.log(responseData)
      setCreateRes({
        ...createInitialState,
        data: responseData.data,
      })
    } catch (error) {
      console.log(error)
      setCreateRes({
        ...createInitialState,
        error,
      })
    }
  }

  const fetchInitState = async () => {
    try {
      const { data: userRes } = await getUsers()
      setInitState({
        ...initialState,
        user: userRes.data,
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
    if (initState.error) {
      onSuccess()
    }
  }, [initState])

  useEffect(() => {
    fetchInitState()
  }, [])

  useEffect(() => {
    if (createRes.data) {
      onSuccess()
    }
  }, [createRes])
  return (
    <>
      <CForm onSubmit={submit}>
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
              {initState.user.map((user, index) => {
                if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
                  return (
                    <option key={index} value={user.id}>
                      {user.email}
                    </option>
                  )
                }
              })}
            </CFormSelect>
          </CRow>
        </CInputGroup>
        <CRow>
          <CCol xs={6}>
            <CButton type="submit" color="primary" className="px-4">
              Pay
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

const AddForm = ({ onSuccess }) => {
  const createInitialState = {
    data: null,
    error: null,
  }

  const initialState = {
    user: [],
    item: [],
    error: null,
  }

  const [createRes, setCreateRes] = useState(createInitialState)
  const [initState, setInitState] = useState(initialState)

  const submit = (e) => {
    e.preventDefault()
    console.log(e)
    onCreateItem({
      item_id: e.target.item_id.value,
      user_id: e.target.user_id.value,
      teller_id: e.target.teller_id.value,
    })
  }

  const onCreateItem = async (body) => {
    try {
      const { data: responseData } = await createOrder(body)
      console.log(responseData)
      setCreateRes({
        ...createInitialState,
        data: responseData.data,
      })
    } catch (error) {
      console.log(error)
      setCreateRes({
        ...createInitialState,
        error,
      })
    }
  }

  const fetchInitState = async () => {
    try {
      const { data: itemRes } = await getAllItem()
      const { data: userRes } = await getUsers()
      setInitState({
        ...initialState,
        item: itemRes.data,
        user: userRes.data,
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
    if (initState.error) {
      onSuccess()
    }
  }, [initState])

  useEffect(() => {
    fetchInitState()
  }, [])

  useEffect(() => {
    if (createRes.data) {
      onSuccess()
    }
  }, [createRes])

  return (
    <>
      <CForm onSubmit={submit}>
        <CCol className="justify-content-center">
          <CInputGroup className="mb-3">
            <CRow>
              <CRow>
                <CFormLabel>Item</CFormLabel>
              </CRow>
              <CFormSelect
                className="px-2 mx-2"
                name="item_id"
                type="select"
                placeholder="Status"
                autoComplete="Status"
              >
                <option>Pilih item</option>
                {initState.item?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </CRow>
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CRow>
              <CRow>
                <CFormLabel>Peminjam</CFormLabel>
              </CRow>
              <CFormSelect
                className="px-2 mx-2"
                name="user_id"
                type="select"
                placeholder="Status"
                autoComplete="Status"
              >
                <option>Pilih peminjam</option>
                {initState.user?.map((user, index) => {
                  if (user.role === 'CUSTOMER') {
                    return (
                      <option key={index} value={user.id}>
                        {user.email}
                      </option>
                    )
                  }
                })}
              </CFormSelect>
            </CRow>
          </CInputGroup>
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
                {initState.user?.map((user, index) => {
                  if (user.role != 'CUSTOMER') {
                    return (
                      <option key={index} value={user.id}>
                        {user.email}
                      </option>
                    )
                  }
                })}
              </CFormSelect>
            </CRow>
          </CInputGroup>
        </CCol>
        <CRow>
          <CCol className="justify-content-end">
            <CButton type="submit" color="primary" className="px-4">
              Submit
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

const Orders = () => {
  const [openAddModal, setOpenAddModal] = React.useState(false)
  const [openDoneModal, setOpenDoneModal] = React.useState(false)
  const [selectedOrder, setSelectedOrder] = React.useState(false)
  const [orders, setOrders] = React.useState({
    data: [],
    error: null,
  })

  const fetchAllOrder = async () => {
    try {
      const { data: responseData } = await getAllOrder()
      setOrders({
        data: responseData.data,
        error: null,
      })
    } catch (error) {
      console.log(error)
      setOrders({
        data: [],
        error: error,
      })
    }
  }

  React.useEffect(() => {
    fetchAllOrder()
  }, [])

  if (orders.error) {
    return <Page500 />
  }

  if (orders.error) {
    return <Page500 />
  }

  return (
    <>
      <CModal size="xl" visible={openAddModal} onClose={() => setOpenAddModal(false)}>
        <CModalHeader>
          <CModalTitle>Add Order</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <AddForm
            onSuccess={() => {
              setOpenAddModal(false)
              fetchAllOrder()
            }}
          />
        </CModalBody>
      </CModal>
      <CModal size="xl" visible={openDoneModal} onClose={() => setOpenDoneModal(false)}>
        <CModalHeader>
          <CModalTitle>Pay Order</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <OrderDoneForm
            order={selectedOrder}
            onSuccess={() => {
              setOpenDoneModal(false)
              fetchAllOrder()
            }}
          />
        </CModalBody>
      </CModal>
      <CCard className="mb-4">
        <CCardHeader>
          <CCardTitle>ORDERS</CCardTitle>
        </CCardHeader>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">Order ID</CTableHeaderCell>
                <CTableHeaderCell>Item Name</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Item Price</CTableHeaderCell>
                <CTableHeaderCell>Order Date</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Item ID</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Teller ID</CTableHeaderCell>
                <CTableHeaderCell className="text-center"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {orders.data?.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    <div>{item.id}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.item_name}</div>
                    <div className="small text-medium-emphasis"></div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{item.item_price}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>
                      <strong>{item.order_date}</strong>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>
                      <strong>{item.teller_id}</strong>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>
                      <strong>{item.user_id}</strong>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {!item.done ? (
                      <CButton
                        color="primary"
                        onClick={() => {
                          setSelectedOrder(item)
                          setOpenDoneModal(true)
                        }}
                      >
                        Done
                      </CButton>
                    ) : (
                      <div>Paid</div>
                    )}
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

export default Orders
