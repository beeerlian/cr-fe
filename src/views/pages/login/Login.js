import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CAlert,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { login } from 'src/services/auth'

const Login = () => {
  const navigate = useNavigate()

  const initialState = {
    data: null,
    error: null,
  }
  const [loginResponse, setLoginResponse] = React.useState(initialState)

  const onLogin = async (data) => {
    try {
      const { data: responseData } = await login(data)
      setLoginResponse({
        ...initialState,
        data: responseData,
      })
    } catch (error) {
      setLoginResponse({
        ...initialState,
        error: error.response?.data || error,
      })
    }
  }

  React.useEffect(() => {
    if (loginResponse.data) {
      console.log(loginResponse?.data?.data?.access_token)
      if (loginResponse.data.data.access_token) {
        localStorage.setItem('accessToken', loginResponse.data.data.access_token)
        navigate('/dashboard', { replace: true })
      } else {
        setLoginResponse({
          ...initialState,
          error: 'Problem when set token to local storage',
        })
      }
    }
  }, [loginResponse])

  const onSubmit = (e) => {
    e.preventDefault()
    onLogin({
      email: e.target.email.value,
      password: e.target.password.value,
    })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        {loginResponse.error ? (
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
            <div>{loginResponse.error?.message || loginResponse.error || 'Login failed'}</div>
          </CAlert>
        ) : null}
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={onSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
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
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Camera Rental</h2>
                    <p>Aplikasi rental kamera.</p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
