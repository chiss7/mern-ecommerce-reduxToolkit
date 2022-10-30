import { DataGrid } from "@mui/x-data-grid";
import { useGetAllProductsQuery } from "../../../redux/features/productApi";

const ProductList = () => {
  const { data, isLoading } = useGetAllProductsQuery();

  const rows = data
    ? data.map((item) => {
        return {
          id: item._id,
          imageUrl: item.image.url,
          pName: item.name,
          pDesc: item.description,
          price: item.price.toLocaleString(),
        };
      })
    : null;

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 80,
      renderCell: (params) => {
        return (
          <div className="image-container">
            <img src={params.row.imageUrl} alt="" />
          </div>
        );
      },
    },
    { field: "pName", headerName: "Product Name", width: 150 },
    {
      field: "pDesc",
      headerName: "Description",
      width: 300,
    },
    {
      field: "price",
      headerName: "Price",
      width: 80,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 130,
      renderCell: (params) => {
        return (
          <div className="actions">
            <button className="delete">Delete</button>
            <button className="view">View</button>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      {isLoading ? (
        "Loading Table..."
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      )}
    </div>
  );
};

export default ProductList;
