import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Cart.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 *
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 *
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
export const generateCartItemsFrom = (cartData, productsData) => {
  console.log("generateCardItemsFrom() called");
  // console.log("cart data is .....",cartData); //this is an Array of OBJECTS.
  // console.log("cart Data issss", cartData);
  // console.log("productsData issss", productsData);
  let CartItem = [];

  cartData.forEach((cartProductObj) => {
    productsData.forEach((productObject) => {
      if (cartProductObj.productId === productObject._id) {
        console.log("FOUND", productObject);
        let finalObj = productObject;

        finalObj["qty"] = cartProductObj.qty;

        CartItem.push(finalObj);
        return;
      }
    });
  });

  // console.log("CART-ITEM ARRAY is:", CartItem);

  return CartItem;
};

/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items = []) => {
  // console.log("getTotalCartValue function:", items);
  let totalPrice = 0;
  items.forEach((cartItemArrayObj) => {
    const ItemPrice = cartItemArrayObj.cost;
    const ItemQuantity = cartItemArrayObj.qty;
    totalPrice += ItemPrice * ItemQuantity;
  });

  // console.log("total price", totalPrice);
  return totalPrice;
};

/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 *
 * @param {Number} value
 *    Current quantity of product in cart
 *
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 *
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 *
 *
 */
// const ItemQuantity = ({value, handleAdd, handleDelete, isReadOnly  }) => {

//   if(isReadOnly){
//     return(
//       <Box>Qty: {value}</Box>
//     )
//   }

// };

// TODO: CRIO_TASK_MODULE_CHECKOUT - Implement function to return total cart quantity
/**
 * Return the sum of quantities of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products in cart
 *
 * @returns { Number }
 *    Total quantity of products added to the cart
 *
 */
export const getTotalItems = (items = []) => { 
  let totalItems=0;
  
  items.forEach( (items)=>{
    totalItems=totalItems+items.qty;
  })

  return totalItems;
};

// TODO: CRIO_TASK_MODULE_CHECKOUT - Add static quantity view for Checkout page cart
/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 *
 * @param {Number} value
 *    Current quantity of product in cart
 *
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 *
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 *
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 *
 */
const ItemQuantity = ({ value, handleAdd, handleDelete, isReadOnly }) => {
  if (isReadOnly) {
    return <Box>Qty: {value}</Box>;
  }

  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

// const handleQuantity=(
//   token,
//   items,
//   products,
//   targetproductId,
//   changedQuantity
// )=>{
//   console.log("Hello from handleQUANTITY");

//   items.forEach( (item)=>{

//     if(item.productId===targetproductId){

//       item.qty=changedQuantity;

//       return;
//     }

//   })

// };

/**
 * Component to display the Cart view
 *
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 *
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 *
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 *
 *
 */
const Cart = ({  products, items = [], handleQuantity,isReadOnly=false }) => {
  // console.log("UI ARRAY", items);

  let history = useHistory();

  const routeToCheckout = () => {
    history.push("/checkout");
  };

  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box className="cart">
        {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}

        {/* add inside condition it will return in item.qty<1 */}
        {items.map((item) => (
          <Box key={item._id}>
            {item.qty > 0 ? (
              <Box display="flex" alignItems="flex-start" padding="1rem">
                <Box className="image-container">
                  <img
                    // Add product image
                    src={item.image}
                    // Add product name as alt eext
                    alt={item.name}
                    width="100%"
                    height="100%"
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  height="6rem"
                  paddingX="1rem"
                >
                  {/* <div>{add product name} </div> */}
                  <div>{item.name}</div>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <ItemQuantity
                      // Add required props by checking implementation
                     
                      handleAdd={async () => {
                        await handleQuantity(
                          window.localStorage.getItem("token"),
                          items,
                          products,
                          item._id,
                          item.qty + 1
                        );
                      }}
                      handleDelete={async () => {
                        await handleQuantity(
                          window.localStorage.getItem("token"),
                          items,
                          products,
                          item._id,
                          item.qty - 1
                        );
                      }}
                      value={item.qty}
                      // key={item._id}
                      isReadOnly={isReadOnly}
                    />

                    <Box padding="0.5rem" fontWeight="700">
                      {/* Add product cost */}${item.cost}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box></Box>
            )}
          </Box>
        ))}
       { !isReadOnly && ( <Box
         
         padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(items)}
          </Box> 

        </Box>)}


        { isReadOnly && ( 
          <Box className="cart" padding="1rem">
            <h2>Order Details</h2>
            <Box className="cart-row">
              <p>Products</p>
              <p>{getTotalItems(items)}</p>
            </Box>
            <Box className="cart-row">
              <p>Subtotal</p>
              <p>${getTotalCartValue(items)}</p>
            </Box>
            <Box className="cart-row">
              <p>Shipping Charges</p>
              <p>$0</p>
            </Box>
            <Box className="cart-row" fontSize="1.25rem" fontWeight="700">
              <p>Total</p>
              <p>${getTotalCartValue(items)}</p>
            </Box>

          </Box>
        )}




        {!isReadOnly && (<Box display="flex" justifyContent="flex-end" className="cart-footer">
          <Button
            color="primary"
            variant="contained"
            startIcon={<ShoppingCart />}
            className="checkout-btn"
            onClick={routeToCheckout}
          >
            Checkout
          </Button>
        </Box>)}
      </Box>
    </>
  );
};

export default Cart;
