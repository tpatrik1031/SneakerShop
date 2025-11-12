<?php

namespace App\Http\Services;

use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class DataTableService
{
    public function handle(Request $request, Builder $query, array $allowedSorts = [], array $searchable = []): LengthAwarePaginator
    {
        $requestData = $request->only(['per_page', 'page', 'search', 'sort', 'direction']);

        // Filtering
        if (!empty($requestData['search']) && !empty($searchable)) {
            $query->where(function ($q) use ($searchable, $requestData) {
                foreach ($searchable as $field) {
                    if ($field instanceof Closure) {
                        $field($q, $requestData['search']);
                    } else {
                        $q->orWhere($field, 'like', '%' . $requestData['search'] . '%');
                    }
                }
            });
        }

        // Sorting
        if (!empty($requestData['sort']) && (empty($allowedSorts) || in_array($requestData['sort'], $allowedSorts))) {
            $direction = Str::lower($requestData['direction'] ?? 'asc');
            $query->orderBy($requestData['sort'], $direction === 'desc' ? 'desc' : 'asc');
        }

        // Pagination
        $perPage = (int)($requestData['per_page'] ?? 10);
        $page = (int)($requestData['page'] ?? 1);

        return $query->paginate(perPage: $perPage, page: $page)->withQueryString();
    }

    public function extractFilters(
        Request $request,
        array   $filterKeys = ['page', 'per_page', 'search', 'sort', 'direction']
    ): array
    {
        return Arr::only($request->all(), $filterKeys);
    }
}
