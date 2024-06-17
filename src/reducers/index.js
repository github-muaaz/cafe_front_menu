import ActionTypeConstants from "../constants/actionTypeConstants";

const reducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypeConstants.SAVE: {
            const { deleteOld, payloadName: key, payload: value } = action;

            if (deleteOld)
                return { ...state, [key]: value };

            if (Array.isArray(state[key])){
                if (Array.isArray(value))
                    return { ...state, [key]: [ ...state[key], ...value ] };
                else
                    return { ...state, [key]: [ ...state[key], value ] };
            }

            return { ...state, [key]: { ...state[key], ...value } };
        }

        case ActionTypeConstants.SAVE_LIST: {
            const { deleteOld, payloadName: key, payload: value } = action;

            if (deleteOld)
                return { ...state, [key]: value };

            const oldList = state[key] || [];
            const uniqueValues = oldList.filter(oldValue => !value.some(newValue => newValue.id === oldValue.id));

            return { ...state, [key]: [...uniqueValues, ...value] };
        }

        case ActionTypeConstants.NEW_TO_LIST: {
            const { payloadName: key, payload: value } = action;

            let oldList = state[key] || [];

            return { ...state, [key]: [value, ...oldList] };
        }

        case ActionTypeConstants.EDIT_LIST: {
            const { payloadName: key, payload: value } = action;

            let oldList = state[key] || [];

            oldList = oldList.map(item => {
                if(item.id === value.id)
                    return value;
                return item;
            });

            return { ...state, [key]: oldList };
        }

        case ActionTypeConstants.SAVE_TO_CART: {
            const {payloadName: key, payload: product} = action;

            const oldCart = state[key] || {};
            let newProduct;

            if (oldCart[product.id]){
                newProduct = {...oldCart[product.id]};
                newProduct.quantity++;
            } else {
                newProduct = {
                    product,
                    quantity: 1
                }
            }

            return { ...state, [key]: { ...oldCart, [product.id]: newProduct } };
        }

        case ActionTypeConstants.REMOVE_FROM_CART: {
            const {payloadName: key, payload: productId} = action;

            const oldCart = {...state[key]} || {};

            delete oldCart[productId];

            return { ...state, [key]: oldCart };
        }

        case ActionTypeConstants.UPDATE_CART: {
            const {payloadName: key} = action;

            const oldCart = {...state[key]} || {};

            Object.values(oldCart)
                .filter(cartProduct => cartProduct.quantity === 0)
                .forEach(cartProduct => delete oldCart[cartProduct.product?.id]);

            return { ...state, [key]: oldCart };
        }

        case ActionTypeConstants.INCREASE_DECREASE_COUNT: {
            const {payloadName: key, payload: productId, mode} = action;

            const cart = state[key] || {};

            const product = {...cart[productId]};

            if (mode === ActionTypeConstants.DECREASE && product.quantity > 0)
                product.quantity--;
            else if (mode === ActionTypeConstants.INCREASE)
                product.quantity++;

            return { ...state, [key]: { ...cart, [productId]: product } };
        }

        case ActionTypeConstants.SAVE_CATEGORIZED: {
            const {payloadName: key, payload: products, category, deleteOld} = action;

            const oldProducts = state[key] || [];

            if (deleteOld)
                return { ...state, [key]: { ...oldProducts, [category]: products} };

            const oldCategoryProducts = oldProducts[category] || [];

            const uniqueProducts = products.filter(newProduct => !oldCategoryProducts.some(oldProduct => oldProduct.id === newProduct.id));

            return { ...state, [key]: { ...oldProducts, [category]: [...oldCategoryProducts, ...uniqueProducts]} }
        }

        case ActionTypeConstants.SAVE_PAGED: {
            const { payloadName: key, payload: items, page } = action;

            const oldItems = state[key] || {};
            const oldPageItems = oldItems[items[page]] || [];

            const uniqueNewItems = items.content.filter(newItem => !oldPageItems.some(oldItem => oldItem.id === newItem.id));

            const size = (oldItems.size || 0) + uniqueNewItems.length;

            return {
                ...state,
                [key]: {
                    ...oldItems,
                    size,
                    [items[page]]: [...uniqueNewItems, ...oldPageItems,]
                }
            };
        }

        case ActionTypeConstants.DELETE: {
            const {payloadName: key} = action;

            const newState = {...state};

            delete newState[key];

            return newState;
        }

        case ActionTypeConstants.SAVE_KEYS:{
            return { ...state, apiKeys: { ...state.apiKeys, ...action.payload } };
        }

        default:
            return state;
    }
};

export default reducer;
