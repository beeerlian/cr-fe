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
  CCardTitle,
  CFormSelect,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'

import { getUsers } from 'src/services/users'
import { register } from 'src/services/auth'

const AddForm = ({ onSuccess }) => {
  const initialState = {
    data: null,
    error: null,
  }

  const [createRes, setCreateRes] = useState(initialState)

  const submit = (e) => {
    e.preventDefault()
    console.log(e)
    onCreateItem({
      name: e.target.name.value,
      email: e.target.email.value,
      identity_number: e.target.identity_number.value,
      identity_type: e.target.identity_type.value,
      phone: e.target.phone.value,
      role: e.target.role.value,
      password: e.target.password.value,
      address: e.target.address.value,
    })
  }

  const onCreateItem = async (body) => {
    try {
      const { data: responseData } = await register(body)
      console.log(responseData)
      setCreateRes({
        ...initialState,
        data: responseData.data,
      })
    } catch (error) {
      console.log(error)
      setCreateRes({
        ...initialState,
        error,
      })
    }
  }

  useEffect(() => {
    if (createRes.data) {
      onSuccess()
    }
  }, [createRes])
  return (
    <>
      {createRes.error ? (
        <CAlert color="danger" className="d-flex align-items-center">
          <svg className="flex-shrink-0 me-2" width="24" height="24" viewBox="0 0 512 512">
            <rect
              width="32"
              height="176"
              x="240"
              y="176"
              fill="var(--ci-primary-color, currentColor)"
              className="ci-primary"
            ></rect>
            <rect
              width="32"
              height="32"
              x="240"
              y="384"
              fill="var(--ci-primary-color, currentColor)"
              className="ci-primary"
            ></rect>
            <path
              fill="var(--ci-primary-color, currentColor)"
              d="M274.014,16H237.986L16,445.174V496H496V445.174ZM464,464H48V452.959L256,50.826,464,452.959Z"
              className="ci-primary"
            ></path>
          </svg>
          <div>
            {createRes.error?.response?.data?.error || createRes.error?.message || 'Failed'}
          </div>
        </CAlert>
      ) : null}
      <CForm onSubmit={submit}>
        <CInputGroup className="mb-3">
          <CInputGroupText>
            <CIcon icon={cilPeople} />
          </CInputGroupText>
          <CFormInput name="name" type="text" placeholder="Name" autoComplete="name" />
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CInputGroupText>
            <CIcon icon={cilPeople} />
          </CInputGroupText>
          <CFormInput name="email" type="email" placeholder="Email" autoComplete="email" />
        </CInputGroup>

        <CInputGroup className="mb-3">
          <CInputGroupText>
            <CIcon icon={cilPeople} />
          </CInputGroupText>
          <CFormSelect name="identity_type" placeholder="Identity Number" autoComplete="email">
            <option>Select Identity Type</option>
            <option value={'KTP'}>KTP</option>
            <option value={'SIM'}>SIM</option>
            <option value={'STUDENT_CARD'}>Student Card</option>
            <option value={'KK'}>Student Card</option>
          </CFormSelect>
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CInputGroupText>
            <CIcon icon={cilPeople} />
          </CInputGroupText>
          <CFormInput
            name="identity_number"
            type="number"
            placeholder="Identity Number"
            autoComplete="email"
          />
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CInputGroupText>
            <CIcon icon={cilPeople} />
          </CInputGroupText>
          <CFormInput name="phone" type="tel" placeholder="Phone" autoComplete="phone" />
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CInputGroupText>
            <CIcon icon={cilPeople} />
          </CInputGroupText>
          <CFormSelect name="role" placeholder="Identity Number" autoComplete="email">
            <option>Select Role</option>
            <option value={'CUSTOMER'}>CUSTOMER</option>
            <option value={'ADMIN'}>ADMIN</option>
            <option value={'SUPER_ADMIN'}>SUPER_ADMIN</option>
          </CFormSelect>
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
        <CInputGroup className="mb-4">
          <CInputGroupText>
            <CIcon icon={cilPeople} />
          </CInputGroupText>
          <CFormInput name="address" type="text" placeholder="Address" />
        </CInputGroup>
        <CRow>
          <CCol xs={6}>
            <CButton type="submit" color="primary" className="px-4">
              Register
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

  const fetchAllUser = async () => {
    try {
      const { data: responseData } = await getUsers()
      setOrders(responseData.data)
    } catch (error) {
      console.log(error)
      setOrders([])
    }
  }

  React.useEffect(() => {
    fetchAllUser()
  }, [])

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
              fetchAllUser()
            }}
          />
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
