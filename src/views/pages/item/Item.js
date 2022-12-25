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
  CCardTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'

import { getAllItem } from 'src/services/items'

const AddForm = () => {
  return (
    <>
      <CForm>
        <CCol className="justify-content-center">
          <CInputGroup className="mb-3">
            <CRow>
              <CRow>
                <CFormLabel>Item Name</CFormLabel>
              </CRow>
              <CFormInput
                className="px-2 mx-2"
                placeholder="Eg. Nicon z200"
                name="item-name"
                type="item-name"
                autoComplete="item-name"
              />
            </CRow>
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CRow>
              <CRow>
                <CFormLabel>Price</CFormLabel>
              </CRow>
              <CFormInput
                className="px-2 mx-2"
                name="price"
                type="price"
                placeholder="Eg. 500.000"
                autoComplete="price"
              />
            </CRow>
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CRow>
              <CRow>
                <CFormLabel>Status</CFormLabel>
              </CRow>
              <CFormInput
                className="px-2 mx-2"
                name="status"
                type="status"
                placeholder="Status"
                autoComplete="Status"
              />
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
        <CCardHeader>
          <CCardTitle>ITEMS</CCardTitle>
        </CCardHeader>
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
                <CTableHeaderCell>Created At</CTableHeaderCell>
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
