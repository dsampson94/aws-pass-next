// components/Hero.tsx
'use client';

export default function Hero() {
    return (
        <section className="bg-gray-100 py-20">
            <div className="container mx-auto text-center px-4">
                <h1 className="text-4xl font-bold mb-4">Master AWS Cloud Practitioner</h1>
                <p className="text-xl mb-8">
                    Test your knowledge with our comprehensive multiple-choice quizzes and prepare for your AWS certification.
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
