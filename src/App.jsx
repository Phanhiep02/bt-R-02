import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const SERVER_API = `https://j672xl-8080.csb.app`;
export default function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    address: "",
    gender: "male",
  });
  // state update , 2
  const [isUpdate, setIsUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState(null);
  const getUsers = async () => {
    try {
      const response = await fetch(`${SERVER_API}/users`);
      const users = await response.json();
      setUsers(users);
    } catch {}
  };
  useEffect(() => {
    getUsers();
  }, []);
  // thêm người dùng
  const addUser = async (data) => {
    try {
      const response = await fetch(`${SERVER_API}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const newUser = await response.json();
        setUsers([...users, newUser]);
        resetForm();
      }
    } catch {
      return false;
    }
  };
  // xóa người dùng
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${SERVER_API}/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        console.error("Failed to delete user");
      }
    } catch {
      return false;
    }
  };
  // api update
  const updateUser = async (data, id) => {
    try {
      const response = await fetch(`${SERVER_API}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const updateUser = await response.json();
        setUsers(users.map((user) => (user.id === id ? updateUser : user)));
      } else {
        console.log("false update");
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  // sửa
  const handleUpdate = (user) => {
    console.log(user);
    setForm({
      name: user.name,
      age: user.age,
      address: user.address,
      gender: user.gender,
    });
    setIdUpdate(user.id);
    setIsUpdate(true);
  };
  const resetForm = () => {
    setForm({ name: "", age: "", address: "", gender: "male" });
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    if (isUpdate) {
      updateUser(form, idUpdate);
      resetForm();
      console.log("sua");
    } else {
      addUser(form);
      resetForm();

      console.log("them");
    }
  };
  const onchangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container py-3">
        <form action="" className="form-update" onSubmit={onSubmitForm}>
          <h2>Thêm người dùng</h2>
          <div className="mb-3">
            <label>Tên</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Tên..."
              onChange={onchangeInput}
              required
              value={form.name}
            />
          </div>
          <div className="mb-3">
            <label>Age</label>
            <input
              type="number"
              name="age"
              className="form-control"
              placeholder="age..."
              onChange={onchangeInput}
              required
              value={form.age}
            />
          </div>
          <div className="mb-3">
            <label>Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="address..."
              required
              onChange={onchangeInput}
              value={form.address}
            />
          </div>
          <div className="mb-3">
            <label>Gender</label>
            <select
              name="gender"
              id=""
              className="form-select"
              onChange={onchangeInput}
              value={form.gender}
            >
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <button className="btn btn-primary">Lưu thay đổi</button>
        </form>
      </div>
      <div className="container py-3">
        <h2>Danh sách người dùng</h2>
        {/* search */}
        {/* <form action="" className="filter-form mb-3">
          <div className="row">
            <div className="col-3">
              <select className="form-select" name="status">
                <option value="all">tất cả trạng thái</option>
                <option value="active">kích hoạt</option>
                <option value="inactive">chưa kích hoạt</option>
              </select>
            </div>
            <div className="col-7">
              <input
                type="search"
                className="form-control"
                placeholder="Từ khóa tìm kiếm"
                name="keyword"
              />
            </div>
            <div className="col-2 d-grid">
              <button type="submit" className="btn btn-primary">
                Tìm
              </button>
            </div>
          </div>
        </form> */}
        {/* sort */}
        {/* <div className="btn-group btn-group-sm mb-3">
          <button className="btn sort-item btn-primary active" data-value="latest">
            mới nhất
          </button>
          <button className="btn sort-item btn-primary" data-value="oldest">
            cũ nhất nhất
          </button>
        </div> */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th width="5%">STT</th>
              <th>Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Gender</th>
              <th width="5%">Sửa</th>

              <th width="5%">Xóa</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ id, name, age, address, gender }, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{name}</td>
                  <td>{age}</td>
                  <td>{address}</td>
                  <td>
                    <span
                      className={
                        gender === "male"
                          ? "badge bg-success"
                          : "badge bg-warning"
                      }
                    >
                      {gender === "male" ? "Nam" : "Nữ"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        handleUpdate({ id, name, age, address, gender })
                      }
                    >
                      Sửa
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUser(id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
