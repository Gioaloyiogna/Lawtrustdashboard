/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
// import {useAuth} from '../../../../app/modules/auth'
import {toAbsoluteUrl} from '../../../helpers'
import {useAuth} from '../../../../app/modules/auth/core/Auth'
// import ChangePasswordModal from '../../../../app/modules/auth/components/ChangePasswordModal'

const HeaderUserMenu: FC = () => {
  const {currentUser, logout} = useAuth() // <== this is a jwt token
  console.log('current user', currentUser?.Email)
  // console.log('currentUser', currentUser)
  // console.log('tenant', tenant)

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3 w-100'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={toAbsoluteUrl('/media/avatars/blank.png')} />
          </div>

          <div className='d-flex flex-column '>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {currentUser?.Email?.split('@')[0].split('.')[0]}
              {/*<span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Pro</span>*/}
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {currentUser?.Email?.split('@')[0].split('.')[1]}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5'>{/* <ChangePasswordModal /> */}</div>

      <div className='menu-item px-5'>
        <a className='menu-link px-5' onClick={logout}>Sign Out</a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
