<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $subject }}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #1f2937;
            -webkit-font-smoothing: antialiased;
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            border: 1px solid #e5e7eb;
        }
        .header {
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
            padding: 28px 24px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 20px;
            font-weight: 700;
            letter-spacing: 0.5px;
        }
        .header p {
            margin: 6px 0 0 0;
            font-size: 13px;
            opacity: 0.9;
        }
        .content {
            padding: 28px 24px;
        }
        .meta-card {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 24px;
        }
        .meta-value a {
            color: #2563eb;
            text-decoration: none;
        }
        .meta-value a:hover {
            text-decoration: underline;
        }
        .message-box {
            background-color: #f9fafb;
            border-left: 4px solid #3b82f6;
            padding: 16px 18px;
            border-radius: 4px;
            margin-top: 8px;
        }
        .message-box h3 {
            margin: 0 0 12px 0;
            font-size: 15px;
            font-weight: 600;
            color: #1e293b;
        }
        .message-text {
            font-size: 14px;
            line-height: 1.6;
            color: #334155;
            white-space: pre-wrap;
            word-break: break-word;
            margin: 0;
        }
        .footer {
            padding: 20px 24px;
            background-color: #f8fafc;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
        }
        .btn-reply {
            display: inline-block;
            margin-top: 20px;
            background-color: #2563eb;
            color: #ffffff !important;
            padding: 10px 20px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 600;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Message from Website</h1>
            <p>Contact Me Form - zakialawi.my.id</p>
        </div>

        <div class="content">
            <div class="meta-card">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr>
                        <td style="padding: 6px 0; width: 110px; font-weight: 600; color: #64748b;">Sender:</td>
                        <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">{{ $name }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Email:</td>
                        <td style="padding: 6px 0; color: #0f172a;">
                            <a href="mailto:{{ $email }}" style="color: #2563eb; text-decoration: none;">{{ $email }}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Subject:</td>
                        <td style="padding: 6px 0; color: #0f172a;">{{ $subject }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Date & Time:</td>
                        <td style="padding: 6px 0; color: #64748b;">{{ $sentAt }}</td>
                    </tr>
                    @if($ipAddress)
                    <tr>
                        <td style="padding: 6px 0; font-weight: 600; color: #64748b;">IP Address:</td>
                        <td style="padding: 6px 0; color: #64748b;">{{ $ipAddress }}</td>
                    </tr>
                    @endif
                </table>
            </div>

            <div class="message-box">
                <h3>Message:</h3>
                <p class="message-text">{{ $messageBody }}</p>
            </div>

            <div style="text-align: center;">
                <a href="mailto:{{ $email }}?subject=Re: {{ rawurlencode($subject) }}" class="btn-reply">
                    Reply Directly via Email
                </a>
            </div>
        </div>

        <div class="footer">
            <p style="margin: 0;">This email was sent automatically from the Contact Me form on <strong>zakialawi.my.id</strong>.</p>
        </div>
    </div>
</body>
</html>
