import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Settings\LanguageController::update
 * @see Http/Controllers/Settings/LanguageController.php:26
 * @route /settings/language
 */
export const update = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ['put'],
    url: '\/settings\/language',
}

/**
 * @see \App\Http\Controllers\Settings\LanguageController::update
 * @see Http/Controllers/Settings/LanguageController.php:26
 * @route /settings/language
 */
update.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return update.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Settings\LanguageController::update
 * @see Http/Controllers/Settings/LanguageController.php:26
 * @route /settings/language
 */
update.put = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(options),
    method: 'put',
})

export default update