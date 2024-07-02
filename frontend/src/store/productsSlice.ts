import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

interface Product {
  id: number;
  id1?: string;
  image?: string;
  imageUrl?: string;
  name: string;
  price: number;
  category: string;
  description: string;
  quantity?: number;
  inStockQuantity?: number;
  cartQuantity: number;
  inStock: boolean;
  discount: number;
  seller?: string;
}

interface ProductsState {
  products: Product[];
  cart: { [key: string]: Product[] };
  discountCode: string | null;
}

const initialState: ProductsState = {
  products: [],
  cart: JSON.parse(localStorage.getItem('cart') || '{}'),
  discountCode: null,
};

const api = axios.create({
  baseURL: 'http://localhost:8088',
});

// Fetch products by user
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (username: string, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/products/user/${username}/products`);
    return response.data.map((product: any) => ({
      ...product,
      quantity: product.quantity,
      inStockQuantity: product.quantity,
      cartQuantity: 0, // Ensure cartQuantity is initialized
      inStock: product.quantity > 0 // Determine if the product is in stock
    }));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue('An unknown error occurred');
    }
  }
});

// Fetch single product by id
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/products/${productId}`);
      console.log('Fetched product data:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

// Add product
export const addProduct = createAsyncThunk('products/createProduct', async (product: Product, { rejectWithValue }) => {
  try {
    const response = await api.post(`/api/products/user/${product.seller}/products`, product);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue('An unknown error occurred');
    }
  }
});

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ product }: { product: Product }) => {
    const { id1 } = product;
    console.log('Sending update request for product:', product);

    if (id1) {
      try {
        const response = await api.put(`/api/products/${id1}`, product);
        console.log('Update response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Failed to update product:', error);
        throw error;
      }
    } else {
      throw new Error('Invalid product ID');
    }
  }
);

// Remove product
export const removeProduct = createAsyncThunk('products/removeProduct', async (productId: string, { rejectWithValue }) => {
  try {
    await api.delete(`/api/products/${productId}`);
    return productId;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue('An unknown error occurred');
    }
  }
});

interface AddToCartPayload {
  productId: string | number;
  userId: string;
}

const discountCodes: { [key: string]: number } = {
  '20OFF': 20,
  '30OFF': 30,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { productId, userId } = action.payload;
      const product = state.products.find((p) => p.id1 === productId || p.id === productId);
      if (product && (product.quantity || product.inStockQuantity) && (product.quantity! > 0 || product.inStockQuantity! > 0)) {
        product.cartQuantity += 1;
        product.quantity !== undefined ? product.quantity -= 1 : product.inStockQuantity! -= 1;

        if (!state.cart[userId]) {
          state.cart[userId] = [];
        }

        const cartProduct = state.cart[userId].find((p) => p.id1 === product.id1 || p.id === product.id);
        if (!cartProduct) {
          const discount = state.discountCode && discountCodes[state.discountCode] ? discountCodes[state.discountCode] : 0;
          state.cart[userId].push({ ...product, discount });
        } else {
          cartProduct.cartQuantity = product.cartQuantity;
          cartProduct.quantity !== undefined ? cartProduct.quantity = product.quantity : cartProduct.inStockQuantity = product.inStockQuantity;
          cartProduct.discount = state.discountCode && discountCodes[state.discountCode] ? discountCodes[state.discountCode] : 0;
        }
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ productId: string | number; userId: string }>
    ) => {
      const { productId, userId } = action.payload;
      const product = state.products.find((p) => p.id1 === productId || p.id === productId);
      if (product && product.cartQuantity > 0) {
        product.cartQuantity -= 1;
        product.quantity !== undefined ? product.quantity += 1 : product.inStockQuantity! += 1;
        const cartProductIndex = state.cart[userId].findIndex(
          (p) => p.id1 === productId || p.id === productId
        );
        const cartProduct = state.cart[userId].find((p) => p.id1 === product.id1 || p.id === product.id);
        if (cartProductIndex !== -1) {
          if (product.cartQuantity === 0) {
            state.cart[userId].splice(cartProductIndex, 1);
          } else {
            // @ts-ignore
            cartProduct.cartQuantity = product.cartQuantity;
            // @ts-ignore
            cartProduct.quantity !== undefined ? cartProduct.quantity = product.quantity : cartProduct.inStockQuantity = product.inStockQuantity;
            // @ts-ignore
            cartProduct.discount = state.discountCode && discountCodes[state.discountCode] ? discountCodes[state.discountCode] : 0;
          }
        }
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    removeItemFromCart: (
      state,
      action: PayloadAction<{ productId: string | number; userId: string }>
    ) => {
      const { productId, userId } = action.payload;
      const product = state.products.find((p) => p.id1 === productId || p.id === productId);
      if (product) {
        product.quantity !== undefined ? product.quantity += product.cartQuantity : product.inStockQuantity! += product.cartQuantity;
        product.cartQuantity = 0;
        state.cart[userId] = state.cart[userId].filter((p) => p.id1 !== productId && p.id !== productId);
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    applyDiscountCode: (state, action: PayloadAction<string>) => {
      const code = action.payload;
      const discountAmount = discountCodes[code] || 0;
      state.discountCode = null;
      Object.keys(state.cart).forEach((userId) => {
        state.cart[userId].forEach((item) => {
          item.discount = 0;
        });
      });
      if (discountAmount) {
        state.discountCode = code;
        Object.keys(state.cart).forEach((userId) => {
          state.cart[userId].forEach((item) => {
            item.discount = discountAmount;
          });
        });
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },

    removeDiscountCode: (state) => {
      state.discountCode = null;
      Object.keys(state.cart).forEach(userId => {
        state.cart[userId].forEach(item => {
          item.discount = 0;
        });
      });
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const existingProduct = state.products.find(product => product.id1 === updatedProduct.id1 || product.id === updatedProduct.id);
        if (existingProduct) {
          Object.assign(existingProduct, updatedProduct);
        }
      })
      .addCase(removeProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.products = state.products.filter((product) => product.id1 !== action.payload && product.id !== Number(action.payload));
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        } else {
          state.products.push(action.payload);
        }
      });
  }
});

export const {
  addToCart,
  removeFromCart,
  removeItemFromCart,
  applyDiscountCode,
  removeDiscountCode,
} = productsSlice.actions;

export default productsSlice.reducer;
