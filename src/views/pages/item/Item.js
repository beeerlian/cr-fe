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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'

import { getAllItem } from 'src/services/items'

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

const Items = () => {
  const [openAddModal, setOpenAddModal] = React.useState(false)
  const [items, setItems] = React.useState([])

  const fetchAllItem = async () => {
    try {
      const { data: responseData } = await getAllItem()
      setItems(responseData.data)
    } catch (error) {
      console.log(error)
      setItems([])
    }
  }

  React.useEffect(() => {
    fetchAllItem()
  }, [])

  return (
    <>
      <CModal size="xl" visible={openAddModal} onClose={() => setOpenAddModal(false)}>
        <CModalHeader>
          <CModalTitle>Add Item</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <AddForm />
        </CModalBody>
      </CModal>
      <CCard className="mb-4">
        <CCardHeader>Item</CCardHeader>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell>Item Name</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Price</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                <CTableHeaderCell>Order At</CTableHeaderCell>
                <CTableHeaderCell className="text-center">User ID</CTableHeaderCell>
                <CTableHeaderCell>Teller ID</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {items.map((item, index) => (
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
                  <CTableDataCell className="text-center">
                    <div>{item.item_status}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>
                      <strong>{item.item_date}</strong>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>
                      <strong>{item.teller_id}</strong>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>
                      <strong>{item.user_id}</strong>
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

export default Items
