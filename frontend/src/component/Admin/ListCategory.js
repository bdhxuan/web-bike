import React, {Fragment, useEffect} from 'react';
import "./ListProduct.css"
import Title from '../layout/Title';
import Sidebar from './Sidebar';
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {getCategories, clearErrors, deleteCategory} from "../../Actions/categoryAction"
import { Button } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import {DELETE_CATEGORY_RESET} from "../../Constants/categoryConstant";


const ListCategory = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { error, categories } = useSelector((state) => state.categories);
    const { error: deleteError, isDeleted } = useSelector((state) => state.deleteCategory);


    const columns = [
        { field: "id", headerName: "Mã danh mục", minWidth: 200, flex: 1 },

        { field: "category", headerName: "Danh mục", minWidth: 200, flex: 0.7},

        { field: "actions", flex: 0.5, headerName: "Actions", minWidth: 150, type: "number", sortable: false, renderCell: (params) => {
            return (
            <Fragment>
                <Button  onClick={() => deleteCategoryHandle(params.getValue(params.id, "id")) } > 
                    <i className='fa-solid fa-trash'></i>
                </Button>
            </Fragment>
            );
        },
        },
    ];

    const rows = [];

    categories && categories.forEach((item) => {
      rows.push({
        id: item._id,
        category: item.category,
      });
    });

    useEffect(() => {
        if (error) {
            window.alert(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            window.alert(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            window.alert("Xóa danh mục thành công");
            navigate("/admin/categories");
            dispatch({ type: DELETE_CATEGORY_RESET });
        }
         dispatch(getCategories());
    }, [dispatch, error, deleteError, navigate, isDeleted]);

    const deleteCategoryHandle = (id) => {
      dispatch(deleteCategory(id));
    };



  return (
    <Fragment>
      <Title title="Danh mục sản phẩm" />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">DANH MỤC SẢN PHẨM</h1>

          <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className="productListTable" autoHeight />
        </div>
      </div>
    </Fragment>
  )
}

export default ListCategory
