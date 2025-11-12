import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Settings\LanguageController::edit
 * @see Http/Controllers/Settings/LanguageController.php:17
 * @route /settings/language
 */
export const edit = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/settings\/language',
}

/**
 * @see \App\Http\Controllers\Settings\LanguageController::edit
 * @see Http/Controllers/Settings/LanguageController.php:17
 * @route /settings/language
 */
edit.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return edit.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Settings\LanguageController::edit
 * @see Http/Controllers/Settings/LanguageController.php:17
 * @route /settings/language
 */
edit.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Settings\LanguageController::edit
 * @see Http/Controllers/Settings/LanguageController.php:17
 * @route /settings/language
 */
edit.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(options),
    method: 'head',
})

export default edit