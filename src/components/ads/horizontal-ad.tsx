"use client";

import { useEffect } from 'react';

declare global {
    interface Window {
        adsbygoogle: any;
    }
}

export function HorizontalAd() {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <div className="flex justify-center w-full my-4">
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-4349648389516627"
                data-ad-slot="YOUR_HORIZONTAL_AD_SLOT_ID" // TODO: Replace with your ad slot ID
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    );
}
