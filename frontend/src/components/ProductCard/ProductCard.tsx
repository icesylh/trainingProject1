import { useState, useEffect } from 'react';
import { Box, Typography, useMediaQuery, useTheme, SelectChangeEvent } from '@mui/material';
import { SingleProductCard } from '../../components/ProductCard/SingleProductCard';
import { SortDropDown } from '../../components/ProductCard/SortDropDown';
import { Pagination } from '../../components/ProductCard/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addToCart, removeFromCart } from '../../store/productsSlice';
import { useNavigate, useParams } from 'react-router-dom';

const outContainerStyle = {
  backgroundColor: '#f9f9f9',
  minHeight: '100vh',
  px: 3,
  py: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const productsContainerStyle = (isMobile: boolean) => ({
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row',
  justifyContent: isMobile ? 'center' : 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
  mx: 'auto',
  width: '100%',
  boxSizing: 'border-box',
  mb: 2,
  gap: isMobile ? 2 : 97,
});

const productFontStyle = (isMobile: boolean) => ({
  fontWeight: 'bold',
  textAlign: isMobile ? 'center' : 'left',
  width: '100%',
});

const productsInnerContainerStyle = {
  width: '100%',
  maxWidth: '1450px',
  backgroundColor: '#FFFFFF',
  p: 4,
  boxShadow: 1,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const gridContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around', 
  alignItems: 'flex-start',
  gap: '20px', 
  flexWrap: 'wrap',
};

const gridItemStyle = {
  flex: '1 1 calc(20% - 16px)', 
  maxWidth: 'calc(20% - 16px)', 
  boxSizing: 'border-box',
};

const paginationStyle = (isMobile: boolean) => ({
  display: 'flex',
  justifyContent: isMobile ? 'center' : 'flex-end',
  maxWidth: '1200px',
  mx: 'auto',
  mt: '3px',
  width: '100%',
  boxSizing: 'border-box',
});

export const ProductCard = () => {
  const { userId } = useParams<{ userId: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

  const [sort, setSort] = useState('lastAdded');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = isMobile ? 3 : 10;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const navigate = useNavigate();

  useEffect(() => {
    handleSortChange({ target: { value: sort } } as SelectChangeEvent<string>);
  }, [products, sort]);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSort(event.target.value);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === 'priceLowToHigh') {
      return a.price - b.price;
    } else if (sort === 'priceHighToLow') {
      return b.price - a.price;
    } else {
      return b.id - a.id; 
    }
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAdd = (id: number) => {
    dispatch(addToCart({ productId: id, userId: userId! }));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart({ productId: id, userId: userId! }));
  };

  const handleAddProduct = () => {
    navigate(`/user/${userId}/create-product`);
  };

  const handleEdit = (productId: number) => {
    navigate(`/user/${userId}/create-product/${productId}`);
  };

  const displayedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <Box sx={outContainerStyle}>
      <Box sx={productsContainerStyle(isMobile)}>
        <Typography variant="h4" sx={productFontStyle(isMobile)}>Products</Typography>
        <Box>
          <SortDropDown isAdmin={isAdmin} value={sort} onChange={handleSortChange} onAddProduct={handleAddProduct} />
        </Box>
      </Box>
      <Box sx={productsInnerContainerStyle}>
        <Box sx={gridContainerStyle}>
          {displayedProducts.map(product => (
            <Box key={product.id} sx={gridItemStyle}>
              <SingleProductCard
                id={product.id}
                imageUrl={product.imageUrl}
                namee={product.name}
                price={product.price}
                cartQuantity={product.cartQuantity}
                onAdd={() => handleAdd(product.id)}
                onRemove={() => handleRemove(product.id)}
                onEdit={() => handleEdit(product.id)}
                isAdmin={isAdmin}
                inStock={product.inStock}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={paginationStyle(isMobile)}>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </Box>
    </Box>
  );
};
