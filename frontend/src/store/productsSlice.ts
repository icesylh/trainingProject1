import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  category: string;
  description: string;
  inStockQuantity: number;
  cartQuantity: number;
  inStock: boolean;
  discount: number;
}

interface ProductsState {
  products: Product[];
  cart: { [key: string]: Product[] };
}

const initialState: ProductsState = {
  products: [
    {
      id: 1,
      imageUrl: "https://via.placeholder.com/150",
      name: "Apple iPhone 11, 128G",
      price: 499.0,
      inStockQuantity: 10,
      cartQuantity: 0,
      category: "Category1",
      description: "A powerful smartphone with 128GB of storage.",
      inStock: true,
      discount: 0,
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/150",
      name: "Samsung Galaxy S21",
      price: 699.0,
      inStockQuantity: 10,
      cartQuantity: 0,
      category: "Category2",
      description: "A high-end smartphone with advanced features.",
      inStock: true,
      discount: 0,
    },
    {
      id: 3,
      imageUrl: "https://via.placeholder.com/150",
      name: "Google Pixel 5",
      price: 599.0,
      inStockQuantity: 10,
      cartQuantity: 0,
      category: "Category1",
      description: "A smartphone with pure Android experience.",
      inStock: true,
      discount: 0,
    },
    {
      id: 4,
      imageUrl: "https://via.placeholder.com/150",
      name: "OnePlus 8T",
      price: 549.0,
      inStockQuantity: 10,
      cartQuantity: 0,
      category: "Category2",
      description: "A fast and smooth smartphone with great features.",
      inStock: true,
      discount: 0,
    },
    {
      id: 5,
      imageUrl: "https://via.placeholder.com/150",
      name: "Sony Xperia 1 II",
      price: 999.0,
      inStockQuantity: 10,
      cartQuantity: 0,
      category: "Category1",
      description: "A smartphone with professional-grade camera.",
      inStock: true,
      discount: 0,
    },
    {
      id: 6,
      imageUrl: "https://via.placeholder.com/150",
      name: "Apple iPhone SE",
      price: 399.0,
      inStockQuantity: 10,
      cartQuantity: 0,
      category: "Category2",
      description: "A compact and affordable iPhone with powerful features.",
      inStock: true,
      discount: 0,
    },
    {
      id: 7,
      imageUrl: "https://via.placeholder.com/150",
      name: "Samsung Galaxy Note 20",
      price: 799.0,
      inStockQuantity: 10,
      cartQuantity: 0,
      category: "Category1",
      description: "A smartphone with a built-in stylus for note-taking.",
      inStock: true,
      discount: 0,
    },
    {
      id: 8,
      imageUrl: "https://via.placeholder.com/150",
      name: "Google Pixel 4a",
      price: 349.0,
      inStockQuantity: 10,
      cartQuantity: 0,
      category: "Category2",
      description: "An affordable smartphone with great camera.",
      inStock: true,
      discount: 0,
    },
    {
      id: 9,
      imageUrl: "https://via.placeholder.com/150",
      name: "OnePlus Nord",
      price: 299.0,
      inStockQuantity: 10,
      cartQuantity: 0,
      category: "Category1",
      description: "A budget-friendly smartphone with premium features.",
      inStock: true,
      discount: 0,
    },
    {
      id: 10,
      imageUrl: "https://via.placeholder.com/150",
      name: "Sony Xperia 5 II",
      price: 899.0,
      inStockQuantity: 10,
      cartQuantity: 0,
      category: "Category2",
      description: "A compact smartphone with powerful performance.",
      inStock: true,
      discount: 0,
    },
    {
      id: 11,
      imageUrl: "https://via.placeholder.com/150",
      name: "Apple iPhone 12",
      price: 799.0,
      inStockQuantity: 10,
      cartQuantity: 0,
      category: "Category1",
      description: "A latest-generation iPhone with advanced features.",
      inStock: true,
      discount: 0,
    },
    {
      id: 12,
      imageUrl: "https://via.placeholder.com/150",
      name: "Samsung Galaxy A52",
      price: 399.0,
      inStockQuantity: 10,
      cartQuantity: 0,
      category: "Category1",
      description: "A mid-range smartphone with great performance.",
      inStock: true,
      discount: 0,
    },
  ],
  cart: JSON.parse(localStorage.getItem('cart') || '{}'),
};

interface AddToCartPayload {
  productId: number;
  userId: string;
}

interface AddProductPayload extends Product {
  userId: string;
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { productId, userId } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product && product.inStockQuantity > 0) {
        product.cartQuantity += 1;
        product.inStockQuantity -= 1;

        if (!state.cart[userId]) {
          state.cart[userId] = [];
        }

        const cartProduct = state.cart[userId].find((p) => p.id === product.id);
        if (!cartProduct) {
          state.cart[userId].push({ ...product });
        } else {
          cartProduct.cartQuantity = product.cartQuantity;
          cartProduct.inStockQuantity = product.inStockQuantity;
        }
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },

    removeFromCart: (
        state,
        action: PayloadAction<{ productId: number; userId: string }>
    ) => {
      const { productId, userId } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product && product.cartQuantity > 0) {
        product.cartQuantity -= 1;
        product.inStockQuantity += 1;
        const cartProductIndex = state.cart[userId].findIndex(
            (p) => p.id === productId
        );
        if (cartProductIndex !== -1) {
          if (product.cartQuantity === 0) {
            state.cart[userId].splice(cartProductIndex, 1);
          } else {
            state.cart[userId][cartProductIndex] = { ...product };
          }
        }
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },

    applyDiscountCode: (state, action: PayloadAction<string>) => {
      if (action.payload === '20DOLLAROFF') {
        Object.keys(state.cart).forEach(userId => {
          state.cart[userId].forEach(item => {
            item.discount = 20;
          });
        });
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },

    addProduct: (state, action: PayloadAction<AddProductPayload>) => {
      const { userId, ...product } = action.payload;
      state.products.push(product);
      if (!state.cart[userId]) {
        state.cart[userId] = [];
      }
      state.cart[userId].push(product);
    },

    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
          (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = {
          ...action.payload,
          inStock: action.payload.inStockQuantity > 0,
        };
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
          (product) => product.id !== action.payload
      );
    },
  },
});

export const {
  addProduct,
  updateProduct,
  removeProduct,
  addToCart,
  removeFromCart,
  applyDiscountCode
} = productsSlice.actions;
export default productsSlice.reducer;
