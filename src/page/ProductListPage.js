// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   CardActions,
//   Button,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import { useCart } from "../cart/CartContex";

// const ProductListPage = () => {
//   const { categoryName } = useParams(); // URL 파라미터에서 카테고리 이름을 가져옴
//   const { addToCart } = useCart();
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // 카테고리에 따라 상품 데이터를 불러오는 로직 (예시로는 API 호출 혹은 로컬 상태에서 필터링)
//     fetchProducts(categoryName);
//   }, [categoryName]);

//   const fetchProducts = (category) => {
//     // 여기에 카테고리에 따른 데이터 불러오기 또는 필터링 로직 구현
//     // API 호출을 가정하고 예시를 작성합니다. 실제 API 엔드포인트와 데이터 구조에 따라 수정이 필요합니다.
//     axios
//       .get(`http://localhost8080:/api/v1/item?category=${category}`)
//       .then((response) => setProducts(response.data));

//     // 임시 데이터와 함께 카테고리 필터링을 시뮬레이션합니다.
//     const allProducts = [
//       {
//         id: 1,
//         name: "Product A",
//         description: "Description A",
//         price: "$10",
//         imageUrl: "/path/to/imageA",
//         category: "하드베이트",
//       },
//       {
//         id: 2,
//         name: "Product B",
//         description: "Description B",
//         price: "$20",
//         imageUrl: "/path/to/imageB",
//         category: "소프트베이트",
//       },
//       // 다른 카테고리의 상품 추가...
//     ];

//     // '전체' 카테고리는 모든 상품을 표시합니다.
//     const filteredProducts =
//       category === "전체"
//         ? allProducts
//         : allProducts.filter((product) => product.category === category);
//     setProducts(filteredProducts);
//   };

//   return (
//     <Grid container spacing={4} style={{ padding: "20px" }}>
//       {products.map((product) => (
//         <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
//           <Card>
//             <CardMedia
//               component="img"
//               height="140"
//               image={product.imageUrl}
//               alt={product.name}
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div">
//                 {product.name}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {product.description}
//               </Typography>
//               <Typography variant="h6">{product.price}</Typography>
//             </CardContent>
//             <CardActions>
//               <Button size="small" component={Link} to={`/item/${product.id}`}>
//                 더 보기
//               </Button>
//               <Button size="small" onClick={() => addToCart(product)}>
//                 장바구니에 추가
//               </Button>
//             </CardActions>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default ProductListPage;
