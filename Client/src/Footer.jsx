export default function Footer(){
    return (
        <footer className="w-full px-6 py-8 bg-primary text-white md:px-12 lg:px-22 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-white/22 pb-6">
                <div className="cursor:pointer">
                    <h2 className="mb-3 font-bold text-lg">NestAway PVT. LTD.</h2>
                    <a className="flex gap-1 hover:underline items-center" target="_blank" href={'https://maps.google.com/?q='+'Bardhaman, West Bengal, India'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        Bardhaman, West Bengal, India
                    </a>
                    <p className="flex gap-1 items-center mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="currentColor" class="size-5">
                            <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clip-rule="evenodd" />
                        </svg>
                        <a href="tel:+911234567890" className="hover:underline">+91 1234567890</a>
                    </p>
                    <p className="flex gap-1 items-center mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>

                        <a href="mailto:support@nestaway.in" className="hover:underline">support@nestaway.in</a>
                    </p>
                </div>
                <div>
                    <h1 className="text-lg font-bold mb-3">Support</h1>
                    <ul className="space-y-2">
                        <li className="hover:underline cursor-pointer">Help center</li>
                        <li className="hover:underline cursor-pointer">Cancellation policy</li>
                        <li className="hover:underline cursor-pointer">Your suggestion</li>
                        <li className="hover:underline cursor-pointer">Terms & conditions</li>
                    </ul>
                </div>
                <div>
                    <h1 className="text-lg font-bold mb-3">Follow us on</h1>
                    <div className="flex gap-4 hover:text-gray-300 transition cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                        <path fill="currentColor" 
                        d="M12 0C8.74 0 8.333.015 7.053.072C5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053C.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 0 0 1.384 2.126A5.868 5.868 0 0 0 4.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 0 0 2.126-1.384a5.86 5.86 0 0 0 1.384-2.126c.296-.765.499-1.636.558-2.913c.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 0 0-1.384-2.126A5.847 5.847 0 0 0 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071c1.17.055 1.805.249 2.227.415c.562.217.96.477 1.382.896c.419.42.679.819.896 1.381c.164.422.36 1.057.413 2.227c.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382a3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413c-1.274.057-1.649.07-4.859.07c-3.211 0-3.586-.015-4.859-.074c-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.899a3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235c-.045-1.26-.061-1.649-.061-4.844c0-3.196.016-3.586.061-4.861c.061-1.17.255-1.814.42-2.234c.21-.57.479-.96.9-1.381c.419-.419.81-.689 1.379-.898c.42-.166 1.051-.361 2.221-.421c1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324a6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.88 0a1.44 1.44 0 0 1 2.88 0z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32"><path fill="currentColor" d="M16 4C9.384 4 4 9.384 4 16s5.384 12 12 12s12-5.384 12-12S22.616 4 16 4zm0 2c5.535 0 10 4.465 10 10a9.977 9.977 0 0 1-8.512 9.879v-6.963h2.848l.447-2.893h-3.295v-1.58c0-1.2.395-2.267 1.518-2.267h1.805V9.652c-.317-.043-.988-.136-2.256-.136c-2.648 0-4.2 1.398-4.2 4.584v1.923h-2.722v2.893h2.722v6.938A9.975 9.975 0 0 1 6 16c0-5.535 4.465-10 10-10z"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M17.751 2.96h3.067l-6.7 7.659L22 21.039h-6.172l-4.833-6.32l-5.531 6.32h-3.07l7.167-8.19L2 2.96h6.328l4.37 5.777zm-1.076 16.243h1.7L7.404 4.7H5.58z"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 1536 1536"><path fill="currentColor" d="M1536 768q0 209-103 385.5T1153.5 1433T768 1536q-111 0-218-32q59-93 78-164q9-34 54-211q20 39 73 67.5t114 28.5q121 0 216-68.5T1232 968t52-270q0-114-59.5-214T1052 321t-255-63q-105 0-196 29t-154.5 77t-109 110.5t-67 129.5T249 738q0 104 40 183t117 111q30 12 38-20q2-7 8-31t8-30q6-23-11-43q-51-61-51-151q0-151 104.5-259.5T776 389q151 0 235.5 82t84.5 213q0 170-68.5 289T852 1092q-61 0-98-43.5T731 944q8-35 26.5-93.5t30-103T799 672q0-50-27-83t-77-33q-62 0-105 57t-43 142q0 73 25 122l-99 418q-17 70-13 177q-206-91-333-281T0 768q0-209 103-385.5T382.5 103T768 0t385.5 103T1433 382.5T1536 768z"/></svg>
                    </div>
                </div>
            </div>
            <div className="text-center pt-4">
                <p className="text-sm font-semibold opacity-80">© 2025 NestAway. All rights reserved.</p>
            </div>
        </footer>
    )
}