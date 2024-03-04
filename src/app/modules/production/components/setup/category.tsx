import {Button, Form, Input, message, Modal, Popconfirm, Space, Table} from 'antd'

import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useState} from 'react'
import {KTCardBody, KTSVG} from '../../../../../_metronic/helpers'
import {
  allHandBookApi,
  deleteLawtrustCategory,
  posthandbookCategory,
  putLawtrustCategory,
} from '../../../../urls'

const Category = () => {
  const queryClient = useQueryClient()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [handbookForm] = Form.useForm()
  const [UpdatehandbookCategoryForm] = Form.useForm()
  const {data: listOfHandBooks, isLoading: handBookLoading} = useQuery('handbook', allHandBookApi)
  const {mutate: deleteCategory} = useMutation((id: any) => deleteLawtrustCategory(id), {
    onSuccess: () => {
      message.success('Category Deleted Successfully')
      queryClient.invalidateQueries('handbook')
      setSubmitLoading(false)
    },
    onError: () => {
      message.error('Something went wrong')
      setSubmitLoading(false)
    },
  })
  function handleDelete(id: any) {
    deleteCategory(id)
  }
  const {mutate: upHandleBook} = useMutation((data) => putLawtrustCategory(data), {
    onSuccess: () => {
      message.success('Category Updated Successfully')
      queryClient.invalidateQueries('handbook')
      UpdatehandbookCategoryForm.resetFields()
      setSubmitLoading(false)
      setisUpdatehandbookCategoryModalOpen(false)
    },
    onError: () => {
      message.error('Category may already exist')
      setSubmitLoading(false)
    },
  })

  const {mutate: addhandbook} = useMutation(posthandbookCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('handbook')
      setIshandbookModalOpen(false)
      setSubmitLoading(false)
      message.success('handbook Class added successfully')
      handbookForm.resetFields()
    },
    onError: (error: any) => {
      setSubmitLoading(false)
      message.error(error.message)
    },
  })
  const [isUpdatehandbookCategoryModalOpen, setisUpdatehandbookCategoryModalOpen] = useState(false)
  const columns: any = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      render: (_: any, record: any) => (
        <Space size='middle'>
          <button
            className={'btn btn-light-primary'}
            onClick={() => {
              setisUpdatehandbookCategoryModalOpen(true)
              // setIsUpdating(true)
              // setIsModalOpen(true)
              UpdatehandbookCategoryForm.setFieldsValue(_)
            }}
          >
            Edit
          </button>
          <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record.id)}>
            <button className={'btn btn-light-danger'}>Delete</button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const [ishandbookModalOpen, setIshandbookModalOpen] = useState(false)

  function handlehandbookCategoryCancel() {
    setIshandbookModalOpen(false)
  }

  function handlehandbookCategorySubmit() {
    handbookForm.submit()
  }
  function handleUpdatehandbookCategorySubmit() {
    UpdatehandbookCategoryForm.submit()
  }
  function handleUpdatehandbookCategoryCancel() {
    setisUpdatehandbookCategoryModalOpen(false)
  }
  function upDatehandbookCategory(values: any) {
    upHandleBook(values)
  }
  function onFinish(values: any) {
    setSubmitLoading(true)
    addhandbook(values)
  }
  //   function handleDelete(record: any) {
  //     if (!record.id || record.id == null) {
  //       message.error('Error while deleting handbook class')
  //       return
  //     } else {
  //       removeEquipmenthandbookCategory(record.id)
  //     }
  //   }
  //   function upDatehandbookCategory(values: any) {
  //     setSubmitLoading(true)
  //     updateModelClass(values)
  //   }

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '2px 2px 15px rgba(0,0,0,0.08)',
      }}
    >
      <KTCardBody className='py-4 '>
        <div className='d-flex justify-content-between'>
          <Space style={{marginBottom: 16}}>
            <Input placeholder='Enter Search Text' type='text' allowClear />
            <Button type='primary'>Search</Button>
          </Space>
          <Space style={{marginBottom: 16}}>
            <button
              type='button'
              className='btn btn-primary me-3'
              onClick={() => setIshandbookModalOpen(true)}
            >
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Add
            </button>
          </Space>
        </div>
        <Table
          columns={columns}
          dataSource={listOfHandBooks?.data}
          bordered
          loading={handBookLoading}
        />
        <Modal
          title='Add handbook Category'
          open={ishandbookModalOpen}
          onCancel={handlehandbookCategoryCancel}
          footer={
            <div className='d-flex justify-content-end'>
              <Button type='dashed' onClick={handlehandbookCategoryCancel}>
                Cancel
              </Button>
              <Button type='primary' loading={submitLoading} onClick={handlehandbookCategorySubmit}>
                Save
              </Button>
            </div>
          }
        >
          <Form
            labelCol={{span: 7}}
            wrapperCol={{span: 14}}
            layout='horizontal'
            form={handbookForm}
            name='control-hooks'
            title='Add handbook'
            onFinish={onFinish}
          >
            <Form.Item label='Name' name='name' rules={[{required: true}]}>
              <Input placeholder='Enter handbook Name' type='text' allowClear />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title='Edit handbook Category'
          open={isUpdatehandbookCategoryModalOpen}
          onCancel={handleUpdatehandbookCategoryCancel}
          footer={
            <div className='d-flex justify-content-end'>
              <Button type='dashed' onClick={handleUpdatehandbookCategoryCancel}>
                Cancel
              </Button>
              <Button
                type='primary'
                loading={submitLoading}
                onClick={handleUpdatehandbookCategorySubmit}
              >
                Save
              </Button>
            </div>
          }
        >
          <Form
            labelCol={{span: 7}}
            wrapperCol={{span: 14}}
            layout='horizontal'
            form={UpdatehandbookCategoryForm}
            name='control-hooks'
            title='Edit handbook category'
            onFinish={upDatehandbookCategory}
          >
            <Form.Item label='Id' name='id' hidden={true} rules={[{required: true}]}>
              <Input placeholder='Enter Id' type='text' allowClear />
            </Form.Item>

            <Form.Item label='Name' name='name' rules={[{required: true}]}>
              <Input placeholder='Enter handbook ' type='text' allowClear />
            </Form.Item>
          </Form>
        </Modal>
      </KTCardBody>
    </div>
  )
}

export default Category
