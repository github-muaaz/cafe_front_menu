export const ProductOptions = ['ACTIVE', 'NON_ACTIVE'];
export const CurrencyOptions = [{id: 1, name : '$'}, {id: 2, name: '원'}];
export const TableOptions = ['FREE', 'ON_SERVICE', 'BOOKED', 'DISABLED'];

export const mapToUrl = str => str?.replace(/[_\s]+/g, '-').toLowerCase();
export const mapStatus = str => str?.replace(/_+/g, '-').toLowerCase();

export const getActualPrice = (originalPrice, discountPercentage) => originalPrice - (originalPrice * (discountPercentage / 100));

export const parsePrice = price => {
    price = price + ',';
    return parseFloat(price.replace(/[,.]/g, ''));
}

export const getTotalPriceWithoutDiscount = (cart) => {
    let sum = 0;

    Object
        .values(cart || {})
        .forEach(item => {
            sum += item.product?.price * item.quantity
    });

    return sum;
}

export const getDiscountPrice = (cart) => {
    let sum = 0;

    Object
        .values(cart || {})
        .filter(item => item.product?.discount)
        .forEach(item => {
            let product = item.product || {};
            sum += (parsePrice(product.price) * item.quantity) - (getActualPrice(parsePrice(product.price), product.discount) * item.quantity)
        });

    return sum;
}

export const calculateTotalOfOrders = (orders) => {
    let sum =  0;

    orders.forEach(order => {
        sum += order.totalPrice;
    })

    return sum;
}

export const calculateDiscountPriceOfOrders = (orders) => {
    let sum =  0;

    orders.forEach(order => {
        const {totalPrice, discountPrice} = order;

        if (totalPrice !== discountPrice)
            sum += (totalPrice - discountPrice);
    })

    return sum;
}