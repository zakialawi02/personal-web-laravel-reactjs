<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessageMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Kirim pesan dari form Contact Me via SMTP.
     */
    public function send(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:100',
            'email'   => 'required|email:filter|max:150',
            'subject' => 'nullable|string|max:150',
            'message' => 'required|string|min:5|max:5000',
        ], [
            'name.required'    => 'Name is required.',
            'name.max'         => 'Name may not be greater than 100 characters.',
            'email.required'   => 'Email address is required.',
            'email.email'      => 'Please provide a valid email address.',
            'email.max'        => 'Email may not be greater than 150 characters.',
            'subject.max'      => 'Subject may not be greater than 150 characters.',
            'message.required' => 'Message is required.',
            'message.min'      => 'Message must be at least 5 characters.',
            'message.max'      => 'Message may not be greater than 5000 characters.',
        ]);

        try {
            Mail::to('hallo@zakialawi.my.id')
                ->cc('zaki.alawi22@gmail.com')
                ->send(new ContactMessageMail($validated, $request->ip()));

            return response()->json([
                'success' => true,
                'message' => 'Your message has been sent successfully! I will get back to you soon.',
            ], 200);
        } catch (\Throwable $e) {
            Log::error('Failed to send contact form email: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'data'  => [
                    'name'  => $validated['name'],
                    'email' => $validated['email'],
                ],
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Unable to send message through the email server at this moment. Please try again later or contact directly via hallo@zakialawi.my.id.',
            ], 500);
        }
    }
}
