<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Verifikasi token reCAPTCHA v2 ("I'm not a robot" checkbox).
 *
 * Selalu dipakai bersama string rule "required" (lihat ContactController) supaya request
 * TANPA token pun ikut divalidasi — rule non-implicit dilewati validator saat nilainya
 * kosong, jadi tanpa "required" bot bisa menembus form hanya dengan tidak mengirim token.
 *
 * Dipakai di dalam $request->validate([...]) supaya permintaan tanpa token yang sah
 * gagal sebagai 422 dan email TIDAK PERNAH terkirim ke SMTP.
 */
class Recaptcha implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Belum dikonfigurasi (secret kosong) → jangan blokir pengunjung.
        // Berlaku hanya sampai kunci reCAPTCHA diisi di .env; setelah itu verifikasi wajib.
        if (blank(config('services.recaptcha.secret_key'))) {
            return;
        }

        if (! is_string($value) || trim($value) === '') {
            $fail('Security verification failed. Please tick "I\'m not a robot" and try again.');
            return;
        }

        $response = Http::asForm()->timeout(5)->post(config('services.recaptcha.verify_url'), [
            'secret'   => config('services.recaptcha.secret_key'),
            'response' => $value,
            'remoteip' => request()->ip(),
        ]);

        $data = $response->successful() ? (array) $response->json() : [];

        $ok = ($data['success'] ?? false) === true
            && $this->hostMatches((string) ($data['hostname'] ?? ''));

        if (! $ok) {
            Log::warning('reCAPTCHA verification failed', [
                'http'         => $response->status(),
                'success'      => $data['success'] ?? null,
                'hostname'     => $data['hostname'] ?? null,
                'error_codes'  => $data['error-codes'] ?? null,
                'request_host' => request()->getHost(),
                'ip'           => request()->ip(),
            ]);

            $fail('Security verification failed. Please tick "I\'m not a robot" and try again.');
        }
    }

    /**
     * Google melaporkan hostname halaman yang memuat widget (bisa dengan/tanpa "www.").
     */
    private function hostMatches(string $hostname): bool
    {
        if ($hostname === '') {
            return false;
        }

        return $this->normalize($hostname) === $this->normalize(request()->getHost());
    }

    private function normalize(string $host): string
    {
        return strtolower(preg_replace('/^www\./i', '', trim($host)));
    }
}
