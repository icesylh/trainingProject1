import {useState, useEffect, useCallback} from 'react';
import { Box, Typography, useMediaQuery, useTheme, SelectChangeEvent } from '@mui/material';
import { SingleProductCard } from './SingleProductCard';
import { SortDropDown } from './SortDropDown';
import { Pagination } from './Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { addToCart, removeFromCart, fetchAllProducts,pushCart,fetchCart } from '../../store/productsSlice';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

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

const gridContainerStyle = (isMobile: boolean) => ({
  display: 'flex',
  justifyContent: isMobile ? 'center' : 'space-around',
  alignItems: 'center',
  gap: '20px',
  flexWrap: 'wrap',
});

const gridItemStyle = (isMobile: boolean) => ({
  flex: isMobile ? '0 1 auto' : '1 1 calc(20% - 16px)',
  maxWidth: isMobile ? '100%' : 'calc(20% - 16px)',
  boxSizing: 'border-box',
});

const paginationStyle = (isMobile: boolean) => ({
  display: 'flex',
  justifyContent: isMobile ? 'center' : 'flex-end',
  maxWidth: '1200px',
  mx: 'auto',
  mt: '3px',
  width: '100%',
  boxSizing: 'border-box',
});

export const ProductCard = ({ userId, token }: { userId: string, token: string }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch<AppDispatch>();


  const [sort, setSort] = useState('lastAdded');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = isMobile ? 3 : 10;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
      setCurrentPage(Number(storedPage));
    }
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      // @ts-ignore
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

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
    localStorage.setItem('currentPage', page.toString());
  };

  const debouncedPushCart = useCallback(
      debounce((id: string, quantity: number) => {
        dispatch(pushCart({ productId: id, quantity }));
      }, 300),
      [dispatch]
  );

  const handleAdd = (id: string, quantity:number) => {
    dispatch(addToCart({ productId: id, userId: userId! }));
    quantity+=1;
    debouncedPushCart(id, quantity);
  };

  const handleRemove = (id: string, quantity:number) => {
    dispatch(removeFromCart({ productId: id, userId: userId! }));
    quantity-=1;
    debouncedPushCart(id, quantity);
  };


  const handleAddProduct = () => {
    navigate(`/user/${userId}/${token}/create-product`);
  };

  const handleEdit = (productId: string) => {
    navigate(`/user/${userId}/${token}/create-product/${productId}`);
  };

  const displayedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  console.log('Rendering ProductCard. Is admin:', isAdmin);

  return (
    <Box sx={outContainerStyle}>
      <Box sx={productsContainerStyle(isMobile)}>
        <Typography variant="h4" sx={productFontStyle(isMobile)}>Products</Typography>
        <Box>
          <SortDropDown isAdmin={isAdmin} value={sort} onChange={handleSortChange} onAddProduct={handleAddProduct} />
        </Box>
      </Box>
      <Box sx={productsInnerContainerStyle} key={Math.random()}>
        <Box sx={gridContainerStyle(isMobile)}>
          {displayedProducts.map((product, index) => (
            <Box key={`${product.id1}-${index}`} sx={gridItemStyle(isMobile)}>
              <SingleProductCard
                id1={product.id1|| ""}
                image={product.image ?? ''}
                namee={product.name}
                price={product.price}
                cartQuantity={product.cartQuantity}
                onAdd={() => handleAdd(product.id1|| "", product.cartQuantity)}
                onRemove={() => handleRemove(product.id1|| "", product.cartQuantity)}
                onEdit={() => handleEdit(product.id1|| "")}
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
