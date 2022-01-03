<?php

namespace App\Http\Controllers\Api;

use App\Bookable;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BookableController extends Controller
{
    public function index()
    {
        return Bookable::all();
    }

    public function show(Request $request, $id)
    {
        return Bookable::findOrFail($id);
    }
}
