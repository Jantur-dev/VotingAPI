<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class ProcessSendEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public $process;
    public $voter;
    public function __construct($process, $voter)
    {
        $this->process = $process;
        $this->voter = $voter;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $voter = $this->voter;
        Mail::send('mail', $this->process, function ($message) use ($voter) {
                $message->to($voter->email)->subject('Verify Email from JanturVote');
                $message->from('vote@gmail.com', 'jantur');
        });
    }
}
