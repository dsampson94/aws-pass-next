// components/Hero.tsx
'use client';

import Image from 'next/image';
import cppBadge from '/public/cppicon.png';

export default function Hero() {
    return (
        <section className="py-20">
            <div className="container mx-auto text-center px-4">
                <Image
                    src={cppBadge}
                    alt="AWS Cloud Practitioner Badge"
                    width={100}
                    height={100}
                    className="mx-auto mb-4"
                />
                <h1 className="text-4xl font-bold mb-4">AWS Cloud Practitioner</h1>
                <p className="text-xl mb-8">
                    Test your knowledge with comprehensive multiple-choice quizzes and prepare for your AWS certification.
                </p>
                <a
                    href="/cloud-practitioner"
                    className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                >
                    Start Quiz
                </a>
            </div>
        </section>
    );
}
