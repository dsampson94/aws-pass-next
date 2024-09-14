// components/Footer.tsx
'use client';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 py-6">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} AWS Quiz Tool. All rights reserved.</p>
            </div>
        </footer>
    );
}
