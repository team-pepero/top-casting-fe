import axios from 'axios';
import { useState } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

const mainCategories = {
	'하드베이트': { items: ['플로팅미노우', '메탈지그', '타이바라', '에기'], ids: [1,2,3,4]},
	'소프트베이트': { items: ['새드', '테일', '호그'], ids: [5,6,7]},
	'메탈지그&스푼': {items: ['메탈지그', '스푼'], ids: [8,9]},
	'스커트베이트': {items: ['스피너베이트', '스피너'], ids: [10, 11]},
	'각종장비': {items: ['낚시대', '악세사리'], ids: [12, 13]}
  };
  
  const CategoryBar = () => {

	const sendMainCategory = async (mainCategory) => {
		try {

		  const response = await axios.get('http://localhost:8081/api/v1/items', {
			params: { maincategory: mainCategory }
		  });
		  console.log(response.data); 
		} catch (error) {
		  console.error('메인카테고리 에러', error);
		}
	  };

	  const sendSubCategory = async (subCategory) => {
		try {
			console.log("subcateogry: ", subCategory)

		  const response = await axios.get('http://localhost:8081/api/v1/items', {
			params: { subcategory: subCategory }
		  });
		  console.log(response.data);
		} catch (error) {
		  console.error('서브 카테고리 에러', error);
		}
	  };


	return (
		<AppBar position="static" color="default">
		<Toolbar>
		  {Object.entries(mainCategories).map(([mainCategory, { items, ids }], index) => (
			<Box key={mainCategory} sx={{ margin: '0 16px' }}>
			  <Button
				onClick={() => sendMainCategory(index + 1)}
			  >
				{mainCategory}
			  </Button>
			  <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
				{items.map((subCategory, subIndex) => (
				  <Button
					key={subCategory}
					onClick={() => sendSubCategory(ids[subIndex])}
				  >
					{subCategory}
				  </Button>
				))}
			  </Box>
			</Box>
		  ))}
		</Toolbar>
	  </AppBar>
	);
  };
  
  export default CategoryBar;
// const categories = ['전체', '하드베이트', '소프트베이트', '메탈지그&스푼', '스커트베이트', '각종 장비', '각종 채비', '고객센터',];

// const CategoryBar = () => {
//   const [activeCategory, setActiveCategory] = useState('전체');

//   return (
//     <AppBar position="static" color="default">
//       <Toolbar>
//         {categories.map((category) => (
//           <Button
//             key={category}
//             onClick={() => setActiveCategory(category)}
//             sx={{
//               marginRight: 2,
//               color: activeCategory === category ? 'primary.main' : 'inherit',
//               fontWeight: activeCategory === category ? 'bold' : 'normal',
//             }}
//           >
//             {category}
//           </Button>
//         ))}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default CategoryBar;