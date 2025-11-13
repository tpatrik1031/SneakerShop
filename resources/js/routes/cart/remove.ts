import { queryParams, type QueryParams } from './../../wayfinder'

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

export default remove