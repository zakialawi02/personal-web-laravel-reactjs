<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMessageMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Data form kontak
     *
     * @var array
     */
    public array $contactData;

    /**
     * IP pengirim
     *
     * @var string|null
     */
    public ?string $ipAddress;

    /**
     * Create a new message instance.
     */
    public function __construct(array $contactData, ?string $ipAddress = null)
    {
        $this->contactData = $contactData;
        $this->ipAddress = $ipAddress;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $subject = !empty($this->contactData['subject'])
            ? '[Contact Form] ' . $this->contactData['subject']
            : '[Contact Form] New Message from ' . ($this->contactData['name'] ?? 'Visitor');

        return new Envelope(
            subject: $subject,
            replyTo: [
                new Address($this->contactData['email'], $this->contactData['name'] ?? 'Visitor'),
            ],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.contact',
            with: [
                'name' => $this->contactData['name'],
                'email' => $this->contactData['email'],
                'subject' => $this->contactData['subject'] ?? '-',
                'messageBody' => $this->contactData['message'],
                'ipAddress' => $this->ipAddress,
                'sentAt' => now()->timezone('Asia/Jakarta')->format('M d, Y - h:i A (T)'),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
