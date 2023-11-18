<?php

namespace App\Http\Controllers;

use App\Events\ChatEvent;
use Illuminate\Http\Request;

class RealtimeController extends Controller
{
    public function send_message(Request $request) {
        $message = $request->message;

        $data_message = [
            'nama' => $request->nama,
            'message' => $message
        ];
        
        ChatEvent::dispatch($data_message);
        // ChatEvent::dispatch($message);

        return redirect()->route('chat');
    }
}
