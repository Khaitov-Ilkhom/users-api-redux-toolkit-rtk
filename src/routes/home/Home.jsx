import {
  useAddNewUserMutation,
  useChangeActiveMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetAllUsersQuery
} from "../../redux/api/users-api.jsx";
import {Button, Form, Input, InputNumber, Modal, notification, Table} from 'antd';
import Loading from "../../components/loading/Loading.jsx";
import {FaUser, FaPhoneAlt} from "react-icons/fa";
import {MdAlternateEmail} from "react-icons/md";
import {FaMapLocationDot} from "react-icons/fa6";
import {GoDotFill} from "react-icons/go";
import {useEffect, useState} from "react";

const Home = () => {
  const {data, isLoading} = useGetAllUsersQuery()
  const [deletedUser] = useDeleteUserMutation()
  const [active] = useChangeActiveMutation()
  const [newUser] = useAddNewUserMutation()
  const [editUser] = useEditUserMutation()
  const [edituser, setEdituser] = useState(null)
  const [form] = Form.useForm();

  const deleteUser = (id) => {
    deletedUser({id})
    notification.success({
      message: "User deleted successfully",
    })
  }
  const changeActiveUser = (user) => {
    active({...user, status: !user.status, edited: true})
  }
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);

  }
  const onFinish = async (value) => {
    if (edituser) {
      await editUser({...value, id: edituser.id, completed: false, archived: false, edited: true})
      form.resetFields();
      notification.success({
        message: "Updated user successfully",
      })
      setEdituser(null)
    } else {
      await newUser({...value, status: false});
      notification.success({
        message: "Created new user successfully",
      })
      setEdituser(null)
    }
    setOpen(false);
  }
  const editingUser = (user) => {
    setEdituser(user)
    setOpen(true)
  }

  useEffect(() => {
    form.setFieldsValue({
      ...edituser
    });
    if (edituser === null) {
      form.resetFields();
    }
  }, [edituser]);
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const columns = [
    {
      title: <div className="text-blue-900">{"No"}</div>,
      key: "id",
      render: (text, record, index) => <p className="text-blue-900">{index + 1}</p>
    },
    {
      title: <div className="text-blue-900">{"Avatar"}</div>,
      key: "avatar",
      render: (item) => <img className="w-[30px] rounded-full" src={item.avatar} alt=""/>
    },
    {
      title: <div className="flex items-center gap-2 text-blue-900"><FaUser/> {"Name"}</div>,
      dataIndex: 'name',
      key: "name",
      render: (name) => `${name}`,
    },
    {
      title: <div className="flex items-center gap-2 text-blue-900"><FaPhoneAlt/> {'Phone Number'}</div>,
      key: 'phone',
      dataIndex: "phone",
      render: (phone) => `${phone}`
    },
    {
      title: <div className="flex items-center gap-2 text-blue-900"><MdAlternateEmail/> {'Email'}</div>,
      key: 'email',
      dataIndex: "email",
      render: (email) => `${email}`
    },
    {
      title: <div className="flex items-center gap-2 text-blue-900"><FaMapLocationDot/> {'Address'}</div>,
      dataIndex: 'address',
      key: 'address',
      render: (address) => `${address}`,
    },
    {
      title: <div className="flex items-center gap-2 text-blue-900"><GoDotFill/> {'Status'}</div>,
      key: 'status',
      render: (user) => (
          <Button onClick={() => changeActiveUser(user)} className="border-none bg-transparent"
                  style={user.status ? {color: "green"} : {color: "red"}}>{user.status ? "Active" : "InActive"}</Button>
      )
    },
    {
      key: "action",
      title: <div className="flex items-center gap-2 text-blue-900">{'Action'}</div>,
      render: (user) => (
          <div className="flex items-center gap-2 ">
            <Button onClick={() => editingUser(user)} className="bg-amber-400 border-none">Edit</Button>
            <Button onClick={() => deleteUser(user.id)} danger type="primary">Delete</Button>
          </div>
      ),
    }
  ];
  return (
      <>
        {
          isLoading ? <Loading/> :
              <div className="max-w-[1400px] mx-auto py-3">
                <Button className="mb-2" onClick={showModal} type="primary">Add new User</Button>
                <Table className="bg-gray-200" columns={columns}
                       dataSource={data?.map(user => ({key: user.id, ...user}))}/>
                <Modal title='Add new User' open={open} onOk={handleOk} onCancel={handleCancel} footer={null}
                       maskClosable={false} centered forceRender={true}>
                  <Form
                      form={form}
                      initialValues={edituser || {}}
                      name="basic"
                      labelCol={{
                        span: 8,
                      }}
                      wrapperCol={{
                        span: 24,
                      }}
                      style={{
                        maxWidth: 600,
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                      layout="vertical"
                  >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your name!',
                          },
                        ]}
                    >
                      <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your email!',
                          },
                        ]}
                    >
                      <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your address!',
                          },
                        ]}
                    >
                      <Input/>
                    </Form.Item>
                    <Form.Item
                        name="avatar"
                        label="Enter avatar link"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your link!',
                          },
                          {
                            type: 'url',
                            message: 'The input is not a valid URL!',
                          },
                        ]}
                    >
                      <Input placeholder="http://example.com"/>
                    </Form.Item>
                    <Form.Item
                        label="Phone number"
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter your phone number!',
                          },
                        ]}
                    >
                      <InputNumber className="w-full"/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                          span: 24,
                        }}
                    >
                      <Button className="w-full" type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>

                  </Form>
                </Modal>
              </div>
        }
      </>
  )
}
export default Home