import {Button, Col, Divider, Dropdown, Input, MenuProps, Row, Select, Space} from 'antd'
import {KTCard, KTCardBody, KTSVG} from '../../../../_metronic/helpers'
import {Link, useLocation} from 'react-router-dom'
import DocViewer, {PDFRenderer, PNGRenderer} from 'react-doc-viewer'
import {useEffect, useState} from 'react'
import {Document, Page} from 'react-pdf'
import {PIC_URL} from '../../../urls'
import {any} from 'prop-types'

const DocumentPage = () => {
  //;<script>document.getElementById('pdf-download')?.style.display='none'</script>
  const location = useLocation()
  const documentData = location.state

  const docs = [
    {uri: `${PIC_URL}/Member/${documentData}`},
    //{uri: require('file:///C:/Users/iT%20HUB/Downloads/Yab_Company%20Profile.pdf')},
  ]
  const [numPages, setNumPages] = useState<number>()
  const [pageNumber, setPageNumber] = useState<number>(1)

  function onDocumentLoadSuccess({numPages}: {numPages: number}): void {
    setNumPages(numPages)
  }
  useEffect(() => {
    const viewerElement = document.querySelector('.doc') // Update this selector based on the actual class name or other identifier

    const handleContextMenu = (event: any) => {
      event.preventDefault() // Prevent the default right-click menu
    }

    if (viewerElement) {
      viewerElement.addEventListener('contextmenu', handleContextMenu)
    }

    return () => {
      // Cleanup: Remove the event listener when the component is unmounted
      if (viewerElement) {
        viewerElement.removeEventListener('contextmenu', handleContextMenu)
      }
    }
  }, [])

  return (
    <>
      <KTCard>
        <KTCardBody>
          <div className='d-flex justify-content-between'>
            {/* <Space style={{marginBottom: 16}}>
              <Input placeholder='Enter Search Text' type='text' allowClear />
            </Space> */}
            {/* <Space style={{marginBottom: 16}}>
              <Link to={'add'}>
                <button type='button' className='btn btn-primary me-3'>
                  <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                  Add
                </button>
              </Link>
            </Space> */}
          </div>
          <Divider orientation='left'>
            <Link to='/dashboard'>
              <button className='btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary'>
                <i className='la la-arrow-left' />
                Back to document list
              </button>
            </Link>
          </Divider>

          <div>
            <DocViewer
              pluginRenderers={[PDFRenderer, PNGRenderer]}
              documents={docs}
              config={{header: {disableFileName: true, disableHeader: true}}}
              className='doc'
              style={{userSelect: 'none'}}
            />
          </div>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export default DocumentPage
