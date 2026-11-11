import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState(() => {

        const savedCart = localStorage.getItem("cartItems");

        return savedCart ? JSON.parse(savedCart) : [];

    });

    useEffect(() => {

        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems)
        );

    }, [cartItems]);


    function addToCart(product) {

        const productQuantity = product.quantity || 1;

        setCartItems((currentItems) => {

            const existingProduct = currentItems.find(
                (item) => item.id === product.id
            );

            if (existingProduct) {

                return currentItems.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity:
                                item.quantity + productQuantity
                        }
                        : item
                );

            }

            return [
                ...currentItems,
                {
                    ...product,
                    quantity: productQuantity
                }
            ];

        });

    }


    function removeFromCart(id) {

        setCartItems((currentItems) =>
            currentItems.filter(
                (item) => item.id !== id
            )
        );

    }


    function increaseQuantity(id) {

        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            )
        );

    }


function decreaseQuantity(id) {

    setCartItems((currentItems) =>
        currentItems.map((item) => {

            if (item.id !== id) {
                return item;
            }

            // Minimum quantity = 1
            if (item.quantity <= 1) {
                return item;
            }

            return {
                ...item,
                quantity: item.quantity - 1
            };

        })
    );

}


    function clearCart() {

        setCartItems([]);

        localStorage.removeItem("cartItems");

    }


    return (

        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart
            }}
        >

            {children}

        </CartContext.Provider>

    );

}