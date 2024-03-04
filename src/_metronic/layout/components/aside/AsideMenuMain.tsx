/* eslint-disable react/jsx-no-target-blank */
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {checkIsActive, KTSVG} from '../../../helpers'
import {useLocation} from 'react-router'
import {useAuth} from '../../../../app/modules/auth'

export function AsideMenuMain() {
  const {pathname} = useLocation()
  const isDashboardActive = checkIsActive(pathname, '/dashboard')
  const {currentUser, auth} = useAuth()
  return (
    <>
      <div className='menu-item'>
        <Link
          className={clsx('menu-link without-sub', {active: isDashboardActive})}
          to='/dashboard'
        >
          <span className='menu-icon'>
            <KTSVG path='/media/icons/duotune/art/art002.svg' className='svg-icon-2' />
          </span>
          <span className='menu-title'>{'Dashboard'}</span>
        </Link>
      </div>
      {/* <AsideMenuItem
        to={'/document/'}
        title={'Documents'}
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen012.svg'
      /> */}
      <AsideMenuItemWithSub
        to='#'
        title='Entries'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        {currentUser?.Email == 'lawtrust.general@lawtrustgh.com' ? (
          <AsideMenuItem to='entries/document' hasBullet={true} title='Document' />
        ) : (
          ''
        )}
      </AsideMenuItemWithSub>

      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='#'
        title='Set Up'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        {currentUser?.Email == 'lawtrust.general@lawtrustgh.com' ? (
          <AsideMenuItem to='setup/category' hasBullet={true} title='Category' />
        ) : (
          ''
        )}
      </AsideMenuItemWithSub>
    </>
  )
}
