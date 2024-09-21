'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import sysOpsBadge from '/public/sysopas.png';

import sysOpsAdministratorQuestions from '@/questions/sysops-administrator-associate';

export default function SysOpsAdministratorOverview() {
    const router = useRouter();

    const monitoringLoggingCount = sysOpsAdministratorQuestions.length;

    const handleStartQuiz = () => {
        router.push('/sysops-administrator-associate/quiz');
    };

    return (
        <section className="py-8 text-white">
            <div className="container mx-auto px-4">
                {/* Badge and Header Section */}
                <div className="max-w-3xl mx-auto bg-gray-800 p-6 shadow-lg rounded-lg text-center">
                    <Image
                        src={sysOpsBadge}
                        alt="AWS SysOps Administrator Badge"
                        width={100}
                        height={100}
                        className="mx-auto mb-4"
                    />
                    <h1 className="text-2xl font-bold text-white mb-2">
                        AWS SysOps Administrator Quiz Overview
                    </h1>
                    <p className="text-lg text-gray-300 mb-6">
                        Prepare for the AWS Certified SysOps Administrator exam by tackling questions designed to simulate the real test experience.
                    </p>
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleStartQuiz}
                        className="p-3 bg-blue-700 text-white w-48 font-bold rounded-lg hover:bg-blue-700"
                    >
                        Start Quiz
                    </button>
                </div>

                {/* Overview Content Section */}
                <div className="max-w-3xl mx-auto bg-white text-gray-800 p-6 shadow-lg rounded-lg mt-8">
                    <h2 className="text-xl font-semibold mb-4">Quiz Breakdown</h2>

                    {/* Monitoring, Logging, and Remediation */}
                    <h3 className="text-lg font-semibold mb-2">1. Monitoring, Logging, and Remediation</h3>
                    <p className="text-gray-700 mb-4">
                        Expect {monitoringLoggingCount} questions in this domain.
                    </p>

                    {/* More subdomains can be added here */}
                    <p className="text-gray-700 text-center">
                        If you can pass this, you are ready!
                    </p>
                </div>
            </div>
        </section>
    );
}
