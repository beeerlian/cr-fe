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
  CCardTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'

import { getUsers } from 'src/services/users'

const AddForm = () => {
  return (
    <>
      <CForm>
        <h1>Login</h1>
        <p className="text-medium-emphasis">Sign In to your account</p>
        <CInputGroup className="mb-3">
          <CInputGroupText>
            <CIcon icon={cilPeople} />
          </CInputGroupText>
          <CFormInput name="email" type="email" placeholder="Email" autoComplete="email" />
        </CInputGroup>
        <CInputGroup className="mb-4">
          <CInputGroupText>
            <CIcon icon={cilPeople} />
          </CInputGroupText>
          <CFormInput
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />
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

const Users = () => {
  const [openAddModal, setOpenAddModal] = React.useState(false)
  const [orders, setOrders] = React.useState([])

  const fetchAllOrder = async () => {
    try {
      const { data: responseData } = await getUsers()
      setOrders(responseData.data)
    } catch (error) {
      console.log(error)
      setOrders([])
    }
  }

  React.useEffect(() => {
    fetchAllOrder()
  }, [])

  return (
    <>
      <CModal size="xl" visible={openAddModal} onClose={() => setOpenAddModal(false)}>
        <CModalHeader>
          <CModalTitle>Add Order</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <AddForm />
        </CModalBody>
      </CModal>
      <CCard className="mb-4">
        <CCardHeader>
          <CCardTitle>Users</CCardTitle>
        </CCardHeader>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Identity Type</CTableHeaderCell>
                <CTableHeaderCell>Identity Number</CTableHeaderCell>
                <CTableHeaderCell>Phone</CTableHeaderCell>
                <CTableHeaderCell>Role</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {orders.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    <div>{item.id}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.name}</div>
                    <div className="small text-medium-emphasis"></div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.email}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>
                      <strong>{item.identity_type}</strong>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>
                      <strong>{item.identity_number}</strong>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>
                      <strong>{item.phone}</strong>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>
                      <strong>{item.role}</strong>
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

export default Users
