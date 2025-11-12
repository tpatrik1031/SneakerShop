<?php

namespace App\Http\Controllers;

use App\Http\Services\DataTableService;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{

    private DataTableService $dataTableService;

    /**
     * @param DataTableService $dataTableService
     */
    public function __construct(DataTableService $dataTableService)
    {
        $this->dataTableService = $dataTableService;
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        $query = User::query();

        $users = $this->dataTableService->handle(
            $request,
            $query,
            ['email', 'email_verified_at','name'],
            ['email', 'email_verified_at','name'],
        );

        return Inertia::render(
            'admin/users/list',
            [
                'users' => $users,
                'filters' => $this->dataTableService->extractFilters($request),
            ]
        );
    }
}
