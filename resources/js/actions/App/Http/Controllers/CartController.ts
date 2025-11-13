import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\CartController::index
 * @see Http/Controllers/CartController.php:12
 * @route /cart
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '\/cart',
}

/**
 * @see \App\Http\Controllers\CartController::index
 * @see Http/Controllers/CartController.php:12
 * @route /cart
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CartController::index
 * @see Http/Controllers/CartController.php:12
 * @route /cart
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CartController::index
 * @see Http/Controllers/CartController.php:12
 * @route /cart
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\CartController::add
 * @see Http/Controllers/CartController.php:22
 * @route /cart/add
 */
export const add = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: add.url(options),
    method: 'post',
})

add.definition = {
    methods: ['post'],
    url: '\/cart\/add',
}

/**
 * @see \App\Http\Controllers\CartController::add
 * @see Http/Controllers/CartController.php:22
 * @route /cart/add
 */
add.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return add.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CartController::add
 * @see Http/Controllers/CartController.php:22
 * @route /cart/add
 */
add.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: add.url(options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\CartController::addCustomShoe
 * @see Http/Controllers/CartController.php:56
 * @route /cart/add-custom-shoe
 */
export const addCustomShoe = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: addCustomShoe.url(options),
    method: 'post',
})

addCustomShoe.definition = {
    methods: ['post'],
    url: '\/cart\/add-custom-shoe',
}

/**
 * @see \App\Http\Controllers\CartController::addCustomShoe
 * @see Http/Controllers/CartController.php:56
 * @route /cart/add-custom-shoe
 */
addCustomShoe.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return addCustomShoe.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CartController::addCustomShoe
 * @see Http/Controllers/CartController.php:56
 * @route /cart/add-custom-shoe
 */
addCustomShoe.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: addCustomShoe.url(options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\CartController::remove
 * @see Http/Controllers/CartController.php:42
 * @route /cart/{cartItem}
 */
export const remove = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: remove.url(args, options),
    method: 'delete',
})

remove.definition = {
    methods: ['delete'],
    url: '\/cart\/{cartItem}',
}

/**
 * @see \App\Http\Controllers\CartController::remove
 * @see Http/Controllers/CartController.php:42
 * @route /cart/{cartItem}
 */
remove.url = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cartItem: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cartItem: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cartItem: args[0],
        }
    }

    const parsedArgs = {
        cartItem: typeof args.cartItem === 'object'
            ? args.cartItem.id
            : args.cartItem,
    }

    return remove.definition.url
            .replace('{cartItem}', parsedArgs.cartItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CartController::remove
 * @see Http/Controllers/CartController.php:42
 * @route /cart/{cartItem}
 */
remove.delete = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: remove.url(args, options),
    method: 'delete',
})

/**
 * @see \App\Http\Controllers\CartController::clear
 * @see Http/Controllers/CartController.php:48
 * @route /cart
 */
export const clear = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: clear.url(options),
    method: 'delete',
})

clear.definition = {
    methods: ['delete'],
    url: '\/cart',
}

/**
 * @see \App\Http\Controllers\CartController::clear
 * @see Http/Controllers/CartController.php:48
 * @route /cart
 */
clear.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return clear.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CartController::clear
 * @see Http/Controllers/CartController.php:48
 * @route /cart
 */
clear.delete = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: clear.url(options),
    method: 'delete',
})

const CartController = { index, add, addCustomShoe, remove, clear }

export default CartController