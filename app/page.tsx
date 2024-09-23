'use client';

import Hero from '../components/Hero';
import { Analytics } from '@vercel/analytics/react';

export default function Home() {
    return (
        <div>
            <Hero/>
            <Analytics/>
        </div>
    );
}
