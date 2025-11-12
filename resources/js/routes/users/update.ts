import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\UserController::update
 * @see Http/Controllers/UserController.php:0
 * @route /admin/users/{user}
 */
export const update = (args: { user: string | number } | [user: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '\/admin\/users\/{user}',
}

/**
 * @see \App\Http\Controllers\UserController::update
 * @see Http/Controllers/UserController.php:0
 * @route /admin/users/{user}
 */
update.url = (args: { user: string | number } | [user: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    const parsedArgs = {
        user: args.user,
    }

    return update.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\UserController::update
 * @see Http/Controllers/UserController.php:0
 * @route /admin/users/{user}
 */
update.put = (args: { user: string | number } | [user: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
 * @see \App\Http\Controllers\UserController::update
 * @see Http/Controllers/UserController.php:0
 * @route /admin/users/{user}
 */
update.patch = (args: { user: string | number } | [user: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

export default update