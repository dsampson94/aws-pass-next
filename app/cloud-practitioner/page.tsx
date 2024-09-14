// app/cloud-practitioner/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function CloudPractitionerOverview() {
    const router = useRouter();

    const handleStartQuiz = () => {
        router.push('/cloud-practitioner/quiz');
    };

    return (
        <section className="py-8 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-blue-600 mb-4">AWS Cloud Practitioner Overview</h1>
                    <p className="text-lg text-gray-700 mb-4">
                        The AWS Certified Cloud Practitioner certification is a foundational certification for individuals
                        looking to gain a basic understanding of AWS Cloud. It validates cloud fluency and foundational
                        AWS knowledge, making it a great certification for non-technical professionals or beginners in
                        cloud computing.
                    </p>
                    <h2 className="text-2xl font-semibold mb-2">Why Take This Course?</h2>
                    <ul className="list-disc ml-5 text-gray-600 mb-4">
                        <li>Gain a high-level understanding of AWS cloud services and concepts.</li>
                        <li>Prepare for the AWS Certified Cloud Practitioner exam.</li>
                        <li>Learn about AWS core services, pricing models, and security best practices.</li>
                    </ul>
                    <p className="text-lg text-gray-700 mb-4">
                        This quiz will help you review your knowledge of AWS Cloud Practitioner topics and prepare you for
                        the certification exam.
                    </p>
                    <button
                        onClick={handleStartQuiz}
                        className="mt-6 p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
                    >
                        Start Cloud Practitioner Quiz
                    </button>
                </div>
            </div>
        </section>
    );
}
