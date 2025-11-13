import { queryParams, type QueryParams } from './../../wayfinder'

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

export default clear