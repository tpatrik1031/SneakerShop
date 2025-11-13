import { queryParams, type QueryParams } from './../../wayfinder'

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

export default addCustomShoe