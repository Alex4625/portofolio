<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use App\Models\Gallery;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;
use App\Models\Video;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function index()
    {
        $profile = Profile::first();
        
        $experiences = Experience::orderBy('order_column', 'asc')
            ->orderBy('start_date', 'desc')
            ->get();
            
        $skills = Skill::orderBy('category')->orderBy('name')->get()->groupBy('category');
        
        $projects = Project::where('is_featured', true)
            ->latest()
            ->get();
            
        $services = Service::orderBy('order_column', 'asc')->get();
        
        $videos = Video::orderBy('order_column', 'asc')->get();
        
        $galleries = Gallery::orderBy('order_column', 'asc')->get();

        return view('welcome', compact('profile', 'experiences', 'skills', 'projects', 'services', 'videos', 'galleries'));
    }
}
