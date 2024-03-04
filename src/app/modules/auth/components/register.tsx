/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {login, parseJwt} from '../core/_requests'
import {useAuth} from '../core/Auth'
import {useMutation, useQuery} from 'react-query'
//import {ESMS_APP_ID, fetchCompanies, fetchUserApplications, fetchUserCompanies} from '../../../urls'
import {Select, message} from 'antd'
import axios from 'axios'
import {loginApi, registerApi} from '../../../urls'

const registerSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Your password is too short.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  confirmpassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
})
const loginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
})
const initialValues = {
  email: '',
  password: '',
  confirmpassword: '',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Register() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const {mutate: registerData} = useMutation((data: any) => registerApi(data), {
    onSuccess: () => {
      message.info('registration done successfully!')
    },
    onError: () => {},
  })
  const {mutate: loginData} = useMutation((data: any) => loginApi(data), {
    onSuccess: () => {
      message.info('log done successfully!')
    },
    onError: () => {},
  })

  const [isSetPassword, setIsPassword] = useState(false)
  const [isOtp, setOtp] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  function setPassword() {
    if (isLogin) {
      setIsPassword(true)
      setIsLogin(false)
      setOtp(false)
    } else {
      setIsPassword(false)
      setIsLogin(true)
      setOtp(false)
    }
  }
  function confirmOtp() {
    if (!isOtp) {
      setOtp(true)
      setIsPassword(false)
      setIsLogin(false)
    }
  }
  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      try {
        registerData(values)
      } catch (Error) {}
      console.log('values', values)
      setLoading(true)
      //   try {
      //     const {data: auth} = await login(values.email, values.password)
      //     saveAuth(auth)

      //     const parsedToken:
      //       | {
      //           header: any
      //           payload: any
      //         }
      //       | undefined = parseJwt(auth.jwtToken)

      //     const userDetails: any = parsedToken?.payload

      //     const userApps = userApplications?.data
      //       ?.filter((item: any) => parseInt(item.userId) === parseInt(userDetails?.id))
      //       .map((filteredItem: any) => {
      //         return filteredItem?.applicationId
      //       })
      //     const userSites: [] = userCompanies?.data
      //       ?.filter((item: any) => parseInt(item.userId) === parseInt(userDetails?.id))
      //       .map((filteredItem: any) => {
      //         return filteredItem?.companyId
      //       })
      //       ?.map((companyId: any) => {
      //         return allCompanies?.data?.find(
      //           (item: any) => parseInt(item.id) === parseInt(companyId)
      //         )
      //       })

      //     const userAllowedApps = userApps?.find((applicationId: any) => {
      //       return parseInt(applicationId) === 0
      //     })
      //     console.log('userAllowedApps', userAllowedApps)

      //     if (!userAllowedApps) {
      //       setStatus("You can't access this application, contact your Administrator!")
      //       setSubmitting(false)
      //       setLoading(false)
      //       return
      //     } else if (!userSites || userSites.length === 0) {
      //       setStatus('You have not been assigned to a site, contact your Administrator!')
      //       setSubmitting(false)
      //       setLoading(false)
      //       return
      //     } else {
      //       const userSite = userSites?.find(
      //         (item: any) =>
      //           item.name?.toLowerCase() ===
      //           allCompanies?.data
      //             ?.find((item: any) => item.name?.toLowerCase() === values.tenantId)
      //             ?.name?.toLowerCase()
      //       )
      //       console.log('userSite', userSite)
      //       if (!userSite) {
      //         setStatus("You can't access this site, contact your Administrator!")
      //         setSubmitting(false)
      //         setLoading(false)
      //         return
      //       }
      //     }
      //     setCurrentUser(userDetails)
      //     saveTenant(values.tenantId)
      //   } catch (error) {
      //     console.error(error)
      //     setStatus('The login detail is incorrect')
      //     setSubmitting(false)
      //     setLoading(false)
      //   }
    },
  })
  const formikLogin = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      try {
        loginData(values)
      } catch (Error) {}

      setLoading(true)
    },
  })
  // localStorage.setItem('tenant', formik.values.tenantId)

  return (
    <>
     
      {true && (
        <form
          className='form w-100'
          onSubmit={formik.handleSubmit}
          noValidate
          id='kt_login_signin_form'
        >
          {formik.status ? (
            <div className='mb-lg-15 alert alert-danger'>
              <div className='alert-text font-weight-bold'>{formik.status}</div>
            </div>
          ) : null}
          <>
            <div className='fv-row mb-10'>
              <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
              <input
                placeholder='e.g:email@lawtrustgh.com'
                {...formik.getFieldProps('email')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.email && formik.errors.email},
                  {'is-valid': formik.touched.email && !formik.errors.email}
                )}
                type='text'
                name='email'
                autoComplete='off'
              />
              {formik.touched.email && formik.errors.email && (
                <div className='fv-plugins-message-container'>
                  <span role='alert'>{formik.errors.email}</span>
                </div>
              )}
            </div>
            <div className='fv-row mb-10'>
              <div className='d-flex justify-content-between mt-n5'>
                <div className='d-flex flex-stack mb-2'>
                  <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
                </div>
              </div>
              <input
                type='password'
                autoComplete='off'
                {...formik.getFieldProps('password')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {
                    'is-invalid': formik.touched.password && formik.errors.password,
                  },
                  {
                    'is-valid': formik.touched.password && !formik.errors.password,
                  }
                )}
              />
              {formik.touched.password && formik.errors.password && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.password}</span>
                  </div>
                </div>
              )}
              <br></br>

              {/* <ForgotPasswordModal /> */}
            </div>
            <div className='fv-row mb-10'>
              <div className='d-flex justify-content-between mt-n5'>
                <div className='d-flex flex-stack mb-2'>
                  <label className='form-label fw-bolder text-dark fs-6 mb-0'>
                    Confirm Password
                  </label>
                </div>
              </div>
              <input
                type='password'
                autoComplete='off'
                {...formik.getFieldProps('confirmpassword')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {
                    'is-invalid': formik.touched.confirmpassword && formik.errors.confirmpassword,
                  },
                  {
                    'is-valid': formik.touched.confirmpassword && !formik.errors.confirmpassword,
                  }
                )}
              />
              {formik.touched.confirmpassword && formik.errors.confirmpassword && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.confirmpassword}</span>
                  </div>
                </div>
              )}
              <br></br>
              <span className='text-primary font-bold cursor-pointer' onClick={setPassword}>
                Back
              </span>
              {/* <ForgotPasswordModal /> */}
            </div>
            <div className='text-center'>
              <button
                type='submit'
                id='kt_sign_in_submit'
                className='btn btn-lg btn-dark w-100 mb-5'
                //disabled={formik.isSubmitting || !formik.isValid}
              >
                {!loading && <span className='indicator-label'> Register</span>}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </>
        </form>
      )}
    </>
  )
}
