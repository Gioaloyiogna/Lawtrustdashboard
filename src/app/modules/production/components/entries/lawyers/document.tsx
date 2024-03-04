import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Upload,
  UploadProps,
  message,
} from 'antd'
import {KTCard, KTCardBody, KTSVG} from '../../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import {UploadOutlined} from '@ant-design/icons'
import {RcFile} from 'antd/es/upload'
import axios from 'axios'
import {
  API_URL,
  allDocumentsApi,
  allHandBookApi,
  deleteLawtrustDocument,
  putDescription,
} from '../../../../../urls'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useForm} from 'antd/es/form/Form'

const AddDocument = () => {
  const [showhandbookModal, setshowHandbookModal] = useState(false)
  const [showEditLawyerModal, setshowEditLawyerModal] = useState(false)
  const {data: documentData, isLoading} = useQuery('document', allDocumentsApi)
  const {data: listOfHandBooks, isLoading: handBookLoading} = useQuery('handbook', allHandBookApi)
  const {mutate: patchDescriptiondata} = useMutation((data: any) => putDescription(data), {
    onSuccess: () => {
      message.success('Document description updated successfully')
      queryClient.invalidateQueries('document')
      setshowEditLawyerModal(false)
      editForm.resetFields()
    },
    onError: (error: any) => {
      message.error('Error updating description')
    },
  })
  const {mutate: handleDeleteData} = useMutation((data: any) => deleteLawtrustDocument(data), {
    onSuccess: () => {
      message.success('Document deleted successfully')
      queryClient.invalidateQueries('document')
      // setshowEditLawyerModal(false)
      // editForm.resetFields()
    },
    onError: (error: any) => {
      message.error('Error deleting document')
    },
  })
  const allowedFileExtensions = ['png', 'jpg', 'jpeg']
  const [editForm] = useForm()
  const [handbookForm] = useForm()
  const queryClient = useQueryClient()
  const [file, setFile] = useState<any>()
  const [coverPicture, setCoverPicture] = useState<any>()
  function handleEdit(record: any) {
    editForm.setFieldsValue({
      id: record.id,
      description: record.description,
      // document: record.document,
      name: record.name,
      author: record.author,
    })
    setshowEditLawyerModal(true)
  }
  function handleCoverPicture(event: any) {
    const file = event.target.files[0]
    setCoverPicture(file)
  }
  function handleDelete(id: any) {
    handleDeleteData(id)
  }
  const columns: any = [
    {
      title: 'Document',
      dataIndex: 'document',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: (category: any) => {
        const data = listOfHandBooks?.data?.filter((item: any) => {
          return item.id.toString() === category
        })
        if (data && data.length > 0) {
          return <>{data[0]?.name}</>
        }
        return <>Uncategorized</>
      },
    },
    {
      title: 'Author',
      dataIndex: 'author',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Action',
      render: (_: any, record: any) => (
        <Space size='middle'>
          <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record.id)}>
            <button className={'btn btn-light-danger'}>Delete</button>
          </Popconfirm>
          <button className={'btn btn-light-primary'}>Edit</button>
        </Space>
      ),
    },
  ]
  function handleDocumentSubmit() {
    handbookForm.submit()
  }
  function handleCancelEdit() {
    editForm.resetFields()
    setshowEditLawyerModal(false)
  }
  // const props: UploadProps = {
  //   name: 'file',
  //   action: (file: RcFile) => {
  //     let formData = new FormData()
  //     console.log('file', file)
  //     formData.append('ImageFile', file)
  //     return new Promise<string>((resolve, reject) => {
  //       axios.post(`${API_URL}/lawtrust67`, formData).then(() => {
  //         message.info('Document Uploaded successfully')
  //         queryClient.invalidateQueries('document')
  //         setshowHandbookModal(false)
  //       })
  //     })
  //   },
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //     Authorization: 'authorization-text',
  //     // Add other headers as needed
  //   },
  //   onChange(info) {
  //     console.log('file info', info)
  //     if (info.file.status !== 'uploading') {
  //       console.log(info.file, info.fileList)
  //     }
  //     if (info.file.status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully`)
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`)
  //     }
  //   },
  // }
  function handleEmployeeModalCancel() {
    setshowHandbookModal(false)
  }

  function openModal() {
    handbookForm.resetFields()
    setFile('')
    setshowHandbookModal(true)
  }
  function onFinish(values: any) {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    const formData = new FormData()
    formData.append('ImageFile', file)
    formData.append('CoverImageFile', coverPicture ? coverPicture : '')
    formData.append('description', values?.description)
    formData.append('author', values?.author)
    formData.append('category', values?.category)
    formData.append('addedIn', new Date().toISOString())
    console.log('formdat', Object.fromEntries(formData))

    axios
      .post(`${API_URL}/lawtrust`, formData, config)
      .then((response) => {
        // Handle success
        message.success('Document added successfully')
        queryClient.invalidateQueries('document')
        handbookForm.resetFields()
        setFile('')
        setCoverPicture('')
        setshowHandbookModal(false)
        // setIsEditing(false)
        // setModalPic('')
        // setProfilePic('')
      })
      .catch((error) => {
        message.info('Added document failed.')
      })
  }
  function handleDocument(event: any) {
    const file = event.target.files[0]
    setFile(file)
  }
  return (
    <>
      <KTCard>
        <KTCardBody>
          <div className='d-flex justify-content-between'>
            <Space style={{marginBottom: 16}}>
              <Input placeholder='Enter Search Text' type='text' allowClear />
            </Space>
            <Space style={{marginBottom: 16}}>
              <Link to={'#'}>
                <button type='button' className='btn btn-primary me-3' onClick={() => openModal()}>
                  <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                  Add
                </button>
              </Link>
            </Space>
          </div>
          <Table
            columns={columns}
            bordered
            dataSource={documentData?.data}
            loading={isLoading}
            scroll={{x: 1500, y: 500}}
          />
          <Modal
            title='Add Document'
            open={showhandbookModal}
            onCancel={handleEmployeeModalCancel}
            footer={
              <div className='d-flex justify-content-end'>
                <Button type='primary' onClick={() => handleDocumentSubmit()}>
                  Submit
                </Button>
                <Button type='dashed' onClick={() => handleEmployeeModalCancel()}>
                  Cancel
                </Button>
              </div>
            }
          >
            <Form
              name={'add-document'}
              layout={'vertical'}
              form={handbookForm}
              onFinish={onFinish}
              labelCol={{span: 8}}
              wrapperCol={{span: 24}}
              title='Add Document'
            >
              <div className='row mb-0 mt-7'>
                <div className='col-12 '>
                  <Form.Item
                    name='document'
                    label='Document'
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      // onChange={handleChange}
                      type='file'
                      onChange={handleDocument}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='row mb-0'>
                <div className='col-12'>
                  <Form.Item name='author' label='Author'>
                    <Input placeholder='Enter Author Name' type='text' className='form-control ' />
                  </Form.Item>
                </div>
              </div>
              <div className='row mb-0'>
                <div className='col-12'>
                  <Form.Item name='description' label='Description'>
                    <Input.TextArea placeholder='Enter Description' className='form-control ' />
                  </Form.Item>
                </div>
              </div>
              <div className='row mb-0'>
                <div className='col-12'>
                  <Form.Item name='category' label='Select category'>
                    <Select placeholder='Select Category' allowClear>
                      {listOfHandBooks?.data?.map((category: any) => (
                        <Select.Option key={category.id} value={category.id}>
                          {category.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className='row mb-0 mt-7'>
                <div className='col-12 '>
                  <Form.Item
                    name='coverImage'
                    label='Cover Picture'
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.resolve()
                          }

                          // Extract the file name from the "fake path" by removing the 'c:\fakepath\' prefix
                          const fileName = value.replace(/^.*[\\\/]/, '')

                          // Extract the file extension from the file name
                          const fileExtension = fileName.split('.').pop().toLowerCase()

                          if (!allowedFileExtensions.includes(fileExtension)) {
                            return Promise.reject('Please upload a valid PNG, JPG, or JPEG file.')
                          }

                          return Promise.resolve()
                        },
                      },
                    ]}
                  >
                    <Input
                      // onChange={handleChange}
                      type='file'
                      onChange={handleCoverPicture}
                    />
                  </Form.Item>
                </div>
              </div>
            </Form>
            {/* <div className='text-center'>
              <Upload {...props}>
                <Button icon={<UploadOutlined rev={undefined} />}>Click to Upload</Button>
              </Upload>
            </div> */}
          </Modal>
          <Modal
            title='Edit Document'
            open={showEditLawyerModal}
            onCancel={() => handleCancelEdit()}
            footer={
              <div className='d-flex justify-content-end'>
                <Button type='dashed' onClick={() => handleCancelEdit()}>
                  Cancel
                </Button>
                <Button type='primary'>Save</Button>
              </div>
            }
          >
            <Form
              labelCol={{span: 7}}
              wrapperCol={{span: 14}}
              layout='horizontal'
              form={editForm}
              name='control-hooks'
              title='Add Category'
              // onFinish={onFinishEdit}
            >
              <Form.Item label='Document' name='document' rules={[{required: true}]}>
                <Input placeholder='Document' type='file' allowClear />
              </Form.Item>
              <Form.Item label='Id' name='id' rules={[{required: true}]} hidden={true}>
                <Input placeholder='Enter Id' type='number' allowClear />
              </Form.Item>

              <Form.Item
                name='author'
                label='Author'
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  // onChange={handleChange}
                  type='text'
                />
              </Form.Item>

              <Form.Item label='Decsription' name='description' rules={[{required: true}]}>
                <Input placeholder='Enter Description' type='text' allowClear />
              </Form.Item>
            </Form>
          </Modal>
        </KTCardBody>
      </KTCard>
    </>
  )
}

export default AddDocument
