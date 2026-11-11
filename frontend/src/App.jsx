import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";


// User Pages
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Category from "./pages/Category/Category";

import OrderDetails from "./pages/OrderDetails/OrderDetails";
import MyAccount from "./pages/MyAccount/MyAccount";

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Admin from "./pages/Admin/Admin";

import CategoryList from "./pages/Admin/CategoryList";
import AddCategory from "./pages/Admin/AddCategory";
import EditCategory from "./pages/Admin/EditCategory";

import ProductList from "./pages/Admin/ProductList";
import AddProduct from "./pages/Admin/AddProduct";
import EditProduct from "./pages/Admin/EditProduct";


import Checkout from "./pages/Checkout/Checkout";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";

// Admin page Orders Details 
import MyOrders from "./pages/MyOrders/MyOrders";
import AdminUsers from "./pages/Admin/Users/AdminUsers";
import AdminOrders from "./pages/Admin/Users/AdminOrders";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/category"
          element={<Category />}
        />

        {/* User Protected */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* Authentication */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Admin Routes */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute role="ADMIN">
              <CategoryList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-category"
          element={
            <ProtectedRoute role="ADMIN">
              <AddCategory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-category/:id"
          element={
            <ProtectedRoute role="ADMIN">
              <EditCategory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute role="ADMIN">
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-product"
          element={
            <ProtectedRoute role="ADMIN">
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-product/:id"
          element={
            <ProtectedRoute role="ADMIN">
              <EditProduct />
            </ProtectedRoute>
          }
        />

        <Route
    path="/checkout"
    element={<Checkout />}
    />

    <Route
    path="/checkout"
    element={<Checkout />}
/>

<Route
    path="/order-success"
    element={<OrderSuccess />}
/>

<Route
    path="/my-orders"
    element={<MyOrders />}
/>


<Route
    path="/admin/users"
    element={
        <ProtectedRoute role="ADMIN">
            <AdminUsers />
        </ProtectedRoute>
    }
/>

<Route
    path="/orders"
    element={
        <ProtectedRoute role="ADMIN">
            <AdminOrders />
        </ProtectedRoute>
    }
/>

<Route
    path="/my-orders/:id"
    element={
        <ProtectedRoute>
            <OrderDetails />
        </ProtectedRoute>
    }
/>

<Route
    path="/my-account"
    element={
        <ProtectedRoute>
            <MyAccount />
        </ProtectedRoute>
    }
/>
      </Routes>
    </>
  );
}

export default App;