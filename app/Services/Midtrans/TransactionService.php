<?php

namespace App\Services\Midtrans;

use App\Contracts\Midtrans\TransactionInterface;
use GuzzleHttp\Promise\PromiseInterface;
use Illuminate\Http\Client\Response;
use App\Services\Midtrans\Request;
use Illuminate\Http\Request as HttpRequest;

class TransactionService extends MidtransService implements TransactionInterface
{
    /**
     * @param $params
     * Create transaction
     */
    public function create($params): PromiseInterface|Response
    {
        return $this->http->post($this->baseUrl . '/charge', $params);
    }

    /*
     * @param $orderId
     * Cancel transaction
     */
    public function cancel($orderId): void
    {
        $this->http->post($this->baseUrl . '/' . $orderId . '/cancel');
    }

    /**
     * @param $orderId
     * Get status of transaction
     */
    public function status($orderId): PromiseInterface|Response
    {
        return $this->http->get($this->baseUrl . '/' . $orderId . '/status');
    }

    /**
     * @param Request $request
     * @param $grossAmount
     * @return bool
     */
    public function hasValidSignature(HttpRequest $request, $grossAmount): bool
    {
        $signature = hash('sha512', $request->order_id . $request->status_code . $grossAmount . '.00' . $this->apiKey);

        return $request->signature_key === $signature;
    }
}
