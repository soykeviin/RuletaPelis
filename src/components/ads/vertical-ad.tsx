"use client";

import { useEffect } from 'react';

declare global {
    interface Window {
        adsbygoogle: any;
    }
}

export function VerticalAd() {
     useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <div className="w-full">
            <ins className="adsbygoogle"
                 style={{ display: 'block' }}
                 data-ad-client="ca-pub-4349648389516627"
                 data-ad-slot="YOUR_VERTICAL_AD_SLOT_ID" // TODO: Replace with your ad slot ID
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
        </div>
    );
}
