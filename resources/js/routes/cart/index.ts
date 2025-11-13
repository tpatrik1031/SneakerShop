import add from './add'
import addCustomShoe from './addCustomShoe'
import remove from './remove'
import clear from './clear'
import { queryParams, type QueryParams } from './../../wayfinder'

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

const cart = {
    index, 
    add, 
    addCustomShoe, 
    remove, 
    clear,
}

export default cart