import React, { useEffect, useState } from "react";
import Layout from "./../../commponets/Layouts/Layout";
import AdminMenu from "./../../commponets/Layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../commponets/Form/CategoryForm";
import { Modal } from "antd";
import TableSkeleton from "../../commponets/Feedback/TableSkeleton";
import StateMessage from "../../commponets/Feedback/StateMessage";
import { getErrorMessage } from "../../utils/error";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [pageError, setPageError] = useState("");
  //handle Form
  const handleSubmit = async (e) => {      
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to create category"));
    } finally {
      setSubmitting(false);
    }
  };

  //get all cat
  const getAllCategory = async () => {
    setLoading(true);
    setPageError("");
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      const message = getErrorMessage(error, "Failed to load categories");
      setPageError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false) ;
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update category"));
    } finally {
      setSubmitting(false);
    }
  };
  //delete category
  const handleDelete = async (pId) => {
    setSubmitting(true);
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to delete category"));
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
                loading={submitting}
                buttonLabel="Create Category"
              />
            </div>
            {pageError ? (
              <StateMessage
                title="Unable to load categories"
                message={pageError}
                variant="danger"
                actionLabel="Retry"
                onAction={getAllCategory}
              />
            ) : null}
            <div className="w-75">
              {loading ? (
                <TableSkeleton rows={5} columns={2} />
              ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
              )}
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
                loading={submitting}
                buttonLabel="Update Category"
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
