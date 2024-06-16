import { Box, Button, TextField, Typography, Select, MenuItem, FormControl, FormLabel, InputAdornment } from '@mui/material';
import { ReactComponent as ImagePreviewIcon } from '../../assets/imagePreview.svg';
import { addProduct, updateProduct, removeProduct } from '../../store/productsSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RootState } from '../../store';

const outerBoxStyle = (isMobile: boolean) => ({
  width: isMobile ? '100%' : 660,
  height: 'auto',
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: isMobile ? 2 : 3.75,
  boxSizing: 'border-box' as const,
  backgroundColor: '#ffffff ',
});

const marginBottomBox = {
  marginBottom: 3,
};

const marginRightSelect = {
  marginRight: 1,
};

const formLabel = {
  marginBottom: 1,
  textAlign: 'left',
};

const customTextareaStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  borderRadius: '4px',
  borderColor: '#ccc',
  resize: 'vertical' as const,
  minHeight: '100px',
  maxHeight: '300px',
  boxSizing: 'border-box' as const,
};

const flexBox = (isMobile: boolean) => ({
  marginBottom: 3,
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: isMobile ? 'column' : 'row',
  gap: isMobile ? 2 : 0,
});

const uploadButtonStyle = {
  backgroundColor: '#6200EA',
  color: 'white',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'darkviolet',
  },
};

const addButtonStyle = {
  backgroundColor: '#6200EA',
  color: 'white',
  textTransform: 'none',
  width: '150px',
};

const deleteButtonStyle = {
  backgroundColor: '#E53E3E',
  color: 'white',
  textTransform: 'none',
  width: '150px',
  marginLeft: '10px',
  '&:hover': {
    backgroundColor: 'darkred',
  },
};

const imagePreviewContainerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginTop: '16px',
  marginBottom: '16px',
};

const imagePreviewBoxStyle = {
  width: '70%',
  height: 200,
  border: '2px dashed #ccc',
  borderRadius: 1,
  color: '#ccc',
  textAlign: 'center' as const,
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
};

const buttonContainerStyle = (isMobile: boolean) => ({
  display: 'flex',
  justifyContent: isMobile ? 'center' : 'flex-start',
  width: '100%',
  marginBottom: 0,
});

const schema = yup.object().shape({
  name: yup.string().required('Product name is required').min(3, 'Product name must be at least 3 characters').max(50, 'Product name must be less than 50 characters'),
  description: yup.string().required('Product description is required').min(10, 'Product description must be at least 10 characters').max(100, 'Product description must be less than 100 characters'),
  category: yup.string().required('Category is required'),
  price: yup.number().required('Price is required').min(0, 'Price must be a positive number'),
  inStockQuantity: yup.number().required('In Stock Quantity is required').min(0, 'In Stock Quantity must be a positive number'),
  imageUrl: yup.string().test('is-url-or-base64', 'Image URL must be a valid URL', (value) => {
    const urlPattern = /^(http|https):\/\/[^\s$.?#].[^\s]*$/gm;
    const base64Pattern = /^data:image\/[a-zA-Z]+;base64,[^\s]+$/gm;
    return urlPattern.test(value || '') || base64Pattern.test(value || '');
  }),
});

interface CreateProductFormProps {
  userId: string;
  isMobile: boolean;
  productId?: string;
}

export const CreateProductForm = ({ userId, isMobile, productId }: CreateProductFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { control, handleSubmit, setValue, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imageUrl = watch('imageUrl', 'http://');
  const product = useSelector((state: RootState) =>
    productId ? state.products.products.find(p => p.id === Number(productId)) : null
  );

  useEffect(() => {
    if (imageUrl && imageUrl !== 'http://') {
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  }, [imageUrl]);

  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('description', product.description);
      setValue('category', product.category);
      setValue('price', product.price);
      setValue('inStockQuantity', product.inStockQuantity);
      setValue('imageUrl', product.imageUrl);
      setImagePreview(product.imageUrl);
    }
  }, [product, setValue]);

  const onSubmit = (data: any) => {
    if (userId) {
      const newProduct = {
        ...data,
        id: product ? product.id : Date.now(),
        inStock: data.inStockQuantity > 0,
        cartQuantity: 0,
      };

      if (product) {
        dispatch(updateProduct({ ...newProduct, userId }));
      } else {
        dispatch(addProduct({ ...newProduct, userId }));
      }
      navigate(`/user/${userId}/products`);
    } else {
      console.error('User ID is missing');
    }
  };

  const handleDelete = () => {
    if (productId) {
      dispatch(removeProduct(Number(productId)));
      navigate(`/user/${userId}/products`);
    } else {
      console.error('Product ID is missing');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setValue('imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={outerBoxStyle(isMobile)}>
      <Box sx={marginBottomBox}>
        <FormControl fullWidth>
          <FormLabel sx={formLabel}>Product name</FormLabel>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <TextField {...field} variant="outlined" error={!!errors.name} helperText={errors.name?.message} />}
          />
        </FormControl>
      </Box>
      <Box sx={marginBottomBox}>
        <FormControl fullWidth>
          <FormLabel sx={formLabel}>Product Description</FormLabel>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <>
                <textarea {...field} style={customTextareaStyle} rows={4} />
                {errors.description && <Typography color="error">{errors.description.message}</Typography>}
              </>
            )}
          />
        </FormControl>
      </Box>
      <Box sx={flexBox(isMobile)}>
        <FormControl fullWidth sx={marginRightSelect}>
          <FormLabel sx={formLabel}>Category</FormLabel>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select {...field} value={field.value || ''} sx={formLabel} error={!!errors.category}>
                <MenuItem value="Category1">Category1</MenuItem>
                <MenuItem value="Category2">Category2</MenuItem>
              </Select>
            )}
          />
          {errors.category && <Typography color="error">{errors.category.message}</Typography>}
        </FormControl>
        <FormControl fullWidth>
          <FormLabel sx={formLabel}>Price</FormLabel>
          <Controller
            name="price"
            control={control}
            render={({ field }) => <TextField {...field} type="number" error={!!errors.price} helperText={errors.price?.message} />}
          />
        </FormControl>
      </Box>
      <Box sx={flexBox(isMobile)}>
        <FormControl fullWidth sx={{ marginRight: 1, width: '50%' }}>
          <FormLabel sx={formLabel}>In Stock Quantity</FormLabel>
          <Controller
            name="inStockQuantity"
            control={control}
            render={({ field }) => <TextField {...field} type="number" sx={marginRightSelect} error={!!errors.inStockQuantity} helperText={errors.inStockQuantity?.message} />}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel sx={formLabel}>Add Image Link</FormLabel>
          <Controller
            name="imageUrl"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ marginRight: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button variant="contained" component="label" sx={uploadButtonStyle}>
                        Upload
                        <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                      </Button>
                    </InputAdornment>
                  ),
                }}
                error={!!errors.imageUrl}
                helperText={errors.imageUrl?.message}
              />
            )}
          />
        </FormControl>
      </Box>
      <Box sx={imagePreviewContainerStyle}>
        <Box sx={imagePreviewBoxStyle}>
          {imagePreview ? (
            <img alt="Preview" src={imagePreview} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : (
            <>
              <Box sx={{ marginBottom: '10px' }}>
                <ImagePreviewIcon width="64px" height="64px" />
              </Box>
              <Typography variant="body1" color="textSecondary">
                image preview!
              </Typography>
            </>
          )}
        </Box>
      </Box>
      <Box sx={buttonContainerStyle(isMobile)}>
        <Button variant="contained" sx={{ ...addButtonStyle }} onClick={handleSubmit(onSubmit)}>
          {product ? 'Update Product' : 'Add Product'}
        </Button>
        {product && (
          <Button variant="contained" sx={{ ...deleteButtonStyle }} onClick={handleDelete}>
            Delete Product
          </Button>
        )}
      </Box>
    </Box>
  );
};