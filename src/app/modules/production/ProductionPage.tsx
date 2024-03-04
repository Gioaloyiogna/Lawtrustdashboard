import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import TopBarProgress from 'react-topbar-progress-indicator'
import {ErrorBoundary, PageLoading} from '@ant-design/pro-components'
import React, {lazy, Suspense} from 'react'
import Document from './components/document'
import AddDocument from './components/entries/lawyers/document'
import DocumentPage from './components/document'
import Category from './components/setup/category'


const accountBreadCrumbs: Array<PageLink> = []

const ProductionPage: React.FC = () => {
  return (
    <Routes>
      <Route
        path='/document/*'
        element={
          <>
            <Outlet />
          </>
        }
      >
        <Route
          path=''
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Lawyer HandBooks</PageTitle>
              <Suspense fallback={<TopBarProgress />}>
                <ErrorBoundary>
                  
                  <DocumentPage />
                </ErrorBoundary>
              </Suspense>
            </>
          }
        />

        {/* entries/document' */}
      </Route>
      <Route
        path='/entries/*'
        element={
          <>
            <Outlet />
          </>
        }
      >
        <Route
          path='document'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Lawyer Handbook</PageTitle>
              <Suspense fallback={<TopBarProgress />}>
                <ErrorBoundary>
                  <AddDocument />
                </ErrorBoundary>
              </Suspense>
            </>
          }
        />
      </Route>
      <Route
        path='/setup/*'
        element={
          <>
            <Outlet />
          </>
        }
      >
        <Route
          path='category'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>HandBook Category</PageTitle>
              <Suspense fallback={<TopBarProgress />}>
                <ErrorBoundary>
                 <Category/>
                </ErrorBoundary>
              </Suspense>
            </>
          }
        />
      </Route>
    </Routes>
  )
}
export default ProductionPage
