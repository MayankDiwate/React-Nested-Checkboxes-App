import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Post } from "../types/Post";

const PostsTable = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      resizable: false,
    },
    {
      field: "userId",
      headerName: "User ID",
      width: 90,
      resizable: false,
    },
    {
      field: "title",
      headerName: "Title",
      width: 250,
      resizable: false,
    },
    {
      field: "body",
      headerName: "Body",
      width: 450,
      resizable: false,
    },
  ];

  return (
    <Box sx={{ height: 650, width: "100%" }}>
      <DataGrid
        rows={posts}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default PostsTable;
