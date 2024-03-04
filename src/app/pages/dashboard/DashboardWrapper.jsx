import React, {Suspense} from 'react'
import {KTSVG} from '../../../_metronic/helpers'
import TopBarProgress from 'react-topbar-progress-indicator'
import {Button, Col, Divider, Dropdown, Input, Row, Select, Space, Card, Tabs, Badge} from 'antd'
import {EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons'
import {Avatar} from 'antd'
import {useQuery} from 'react-query'
import {allDocumentsApi, PIC_URL, allHandBookApi} from '../../urls'
import {Link} from 'react-router-dom'

const {Meta} = Card

const DashboardWrapper = () => {
  const {data: allDocuments} = useQuery('document', allDocumentsApi)
  const {data: listOfHandBooks, isLoading: handBookLoading} = useQuery('handbook', allHandBookApi)
  const chunkArray = (array, chunkSize) => {
    const result = []
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize))
    }
    return result
  }

  const chunkedDocuments = chunkArray(allDocuments?.data ? allDocuments?.data : [], 4)

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
        height: '100%',
      }}
    >
      <Tabs
        defaultActiveKey='1'
        items={[
          {
            label: (
              <Badge>
                <span className='me-4'>All Handbooks</span>
              </Badge>
            ),
            key: '1',
            children: (
              <>
                <div className='d-flex justify-content-between'>
                  <Space style={{marginBottom: 16}}>
                    <Input placeholder='Enter Search Text' type='text' allowClear />
                  </Space>
                </div>
                {chunkedDocuments.map((row, rowIndex) => (
                  <Row gutter={[16, 16]} key={rowIndex}>
                    {row.map((item, columnIndex) => {
                      const data = listOfHandBooks?.data?.filter(
                        (book) => book.id.toString() === item.category
                      )

                      return (
                        <Col xs={24} sm={12} md={8} lg={6} key={rowIndex * 4 + columnIndex}>
                          <Link state={item?.document} to='/document'>
                            <Card
                              style={{width: '100%'}}
                              cover={
                                <img
                                  alt='example'
                                  src={
                                    item.coverPicture
                                      ? `${PIC_URL}/Member/${item.coverPicture}`
                                      : 'media/logos/lawimage.png'
                                  }
                                  style={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'contain',
                                  }}
                                />
                              }
                            >
                              <Meta
                                title={item.document}
                                description={
                                  <>
                                    <div
                                      style={{fontSize: '16px', color: '#555', marginTop: '8px'}}
                                    >
                                      <p style={{marginBottom: '4px'}}>Author: {item.author}</p>
                                      <p style={{marginBottom: '4px'}}>
                                        Category: {data[0]?.name ? data[0]?.name : 'No category'}
                                      </p>
                                      <p style={{marginBottom: '4px'}}>
                                        Published on:{' '}
                                        {item.addedIn &&
                                          new Date(item.addedIn).toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                          })}
                                      </p>
                                    </div>
                                    <div>
                                      <p style={{marginBottom: '0'}}>{item.description}</p>
                                    </div>
                                  </>
                                }
                              />
                            </Card>
                          </Link>
                        </Col>
                      )
                    })}
                  </Row>
                ))}
              </>
            ),
          },
          {
            label: (
              <Badge>
                <span className='me-4'>Most Recent Handbooks</span>
              </Badge>
            ),
            key: '2',
            children: (
              <>
                <div className='d-flex justify-content-between'>
                  <Space style={{marginBottom: 16}}>
                    <Input placeholder='Enter Search Text' type='text' allowClear />
                  </Space>
                </div>
                {chunkedDocuments.map((row, rowIndex) => (
                  <Row gutter={[16, 16]} key={rowIndex}>
                    {row.map((item, columnIndex) => {
                      const data = listOfHandBooks?.data?.filter(
                        (book) => book.id.toString() === item.category
                      )

                      return (
                        <Col xs={24} sm={12} md={8} lg={6} key={rowIndex * 4 + columnIndex}>
                          <Link state={item?.document} to='/document'>
                            <Card
                              style={{width: '100%'}}
                              cover={
                                <img
                                  alt='example'
                                  src={
                                    item.coverPicture
                                      ? `${PIC_URL}/Member/${item.coverPicture}`
                                      : 'media/logos/lawimage.png'
                                  }
                                  style={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'contain',
                                  }}
                                />
                              }
                            >
                              <Meta
                                title={item.document}
                                description={
                                  <>
                                    <div
                                      style={{fontSize: '16px', color: '#555', marginTop: '8px'}}
                                    >
                                      <p style={{marginBottom: '4px'}}>Author: {item.author}</p>
                                      <p style={{marginBottom: '4px'}}>
                                        Category: {data[0]?.name ? data[0]?.name : 'No category'}
                                      </p>
                                      <p style={{marginBottom: '4px'}}>
                                        Published on:{' '}
                                        {item.addedIn &&
                                          new Date(item.addedIn).toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                          })}
                                      </p>
                                    </div>
                                    <div>
                                      <p style={{marginBottom: '0'}}>{item.description}</p>
                                    </div>
                                  </>
                                }
                              />
                            </Card>
                          </Link>
                        </Col>
                      )
                    })}
                  </Row>
                ))}
              </>
            ),
          },
        ]}
      />
    </div>
  )
}

export default DashboardWrapper
